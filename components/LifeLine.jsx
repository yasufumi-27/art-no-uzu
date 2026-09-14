"use client";

import { useEffect, useRef, useState } from "react";

// TOP 専用：「一本の線の人生」。
// ページの左の余白に、上端から下端まで一本の墨の線を通し、ページ全体を 21歳（2015年、渦を描き始めた年）から
// 100歳（2094年）までの80年に見立てる。
// ・スクロールに合わせて、ペン先が「いま読んでいる位置」まで線を描き進める（操作していないときは静止）
// ・10年ごと（30歳〜100歳）に、線がその場で渦をひと巻き描いてから先へ進む。年を重ねるほど渦は大きく、巻き数も増える
// ・年を取るにつれて線がわずかに震えていく（筆跡そのものが80年分老いていく）
// ・ペン先には今の年と年齢が付いてきて、描き終えた節目には「2024 / 30歳」の記録が残る
// 作品やテキストには重ならず、メインビジュアルの下からページ末尾までの、コンテンツ幅の外側の余白だけを使う。
const START = 2015;
const BORN = 1994;
const YEARS = 79; // 2015 → 2094
const STEP = 0.02; // 年単位のサンプリング間隔
const LOOP_HALF = 0.9; // 節目の渦を描くのに使う年数の半分
const CONTENT_WIDTH = 1180; // globals.css の --content-width と同じ

// 節目：30歳, 40歳, … 100歳
const MILESTONES = Array.from({ length: 8 }, (_, k) => {
  const age = 30 + k * 10;
  return { k, age, year: BORN + age, t: BORN + age - START };
});

// 節目の渦の半径：年を重ねるほど大きく（余白の幅を超えない範囲で）
function loopRadius(width, k) {
  return Math.min(width * 0.42, 10 + k * 5);
}

function build(width, height) {
  const cx = width / 2;
  const pts = [];
  for (let t = 0; t <= YEARS + 1e-9; t += STEP) {
    const age = t / YEARS;
    // 年齢とともに増していく手の震え
    const amp = 0.15 + age * age * 2.4;
    let x = cx + amp * Math.sin(t * 23.7) + amp * 0.6 * Math.sin(t * 61.3 + 1.7);
    let y = (t / YEARS) * height;
    const m = MILESTONES.find((m) => Math.abs(t - m.t) <= LOOP_HALF);
    if (m) {
      // 節目：線の上の点から渦を描き出し、また線へ戻ってくる
      const u = (t - (m.t - LOOP_HALF)) / (LOOP_HALF * 2);
      const turns = 1.5 + m.k * 0.5;
      const rMax = loopRadius(width, m.k);
      const r = rMax * Math.sin(Math.PI * u);
      const a = u * turns * Math.PI * 2 - Math.PI / 2;
      x += r * Math.cos(a);
      y = (m.t / YEARS) * height + r * Math.sin(a) + r;
    }
    pts.push([x, y, t]);
  }
  let len = 0;
  const lengths = [0];
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    lengths.push(len);
    d += `L${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)}`;
  }
  return { d, pts, lengths, total: len };
}

export default function LifeLine() {
  const [geo, setGeo] = useState(null);
  const line = useRef(null);
  const tip = useRef(null);
  const tipLabel = useRef(null);
  const marks = useRef([]);
  const data = useRef(null);

  // 余白の幅とページの高さに合わせて線を組み立てる
  useEffect(() => {
    let timer = 0;
    const measure = () => {
      const width = Math.max(20, Math.min(160, (window.innerWidth - CONTENT_WIDTH) / 2 + 24));
      // メインビジュアル（最初の section）の下端から描き始める
      const hero = document.querySelector("main section");
      const top = hero ? hero.getBoundingClientRect().bottom + window.scrollY : 0;
      const height = document.documentElement.scrollHeight - top;
      const g = build(width, height);
      data.current = g;
      setGeo({ width, height, top, d: g.d, total: g.total });
    };
    measure();
    const ro = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(measure, 150);
    });
    ro.observe(document.body);
    return () => {
      ro.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // スクロールでペン先を進める
  useEffect(() => {
    if (!geo) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const g = data.current;
      if (!g || !line.current) return;
      // 画面の中ほど（上から55%）の位置まで描き進める
      const target = window.scrollY + window.innerHeight * 0.55 - geo.top;
      const t = Math.min(YEARS, Math.max(0, (target / geo.height) * YEARS));
      const i = Math.min(g.pts.length - 1, Math.round(t / STEP));
      line.current.style.strokeDashoffset = String(g.total - g.lengths[i]);
      const [x, y] = g.pts[i];
      tip.current.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
      const year = START + Math.floor(t);
      if (tipLabel.current) tipLabel.current.textContent = `${year}  ${year - BORN}歳`;
      marks.current.forEach((el, k) => el?.classList.toggle("is-drawn", t >= MILESTONES[k].t + LOOP_HALF));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [geo]);

  if (!geo) return null;
  const showLabels = geo.width >= 70;

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute left-0 z-20 text-[var(--color-ink)]"
      width={geo.width}
      height={geo.height}
      style={{ overflow: "visible", top: geo.top }}
    >
      <path
        ref={line}
        d={geo.d}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={geo.total}
        strokeDashoffset={geo.total}
        opacity="0.55"
      />
      {showLabels &&
        MILESTONES.map((m, k) => (
          <text
            key={m.age}
            ref={(el) => (marks.current[k] = el)}
            x={geo.width / 2 + loopRadius(geo.width, k) + 6}
            y={(m.t / YEARS) * geo.height + loopRadius(geo.width, k) * 2 + 14}
            className="lifeline-mark fill-[var(--color-muted)] text-[9px] tracking-[0.15em]"
          >
            {m.year} / {m.age}歳
          </text>
        ))}
      <g ref={tip}>
        <circle r="2.5" fill="currentColor" />
        {showLabels && (
          <text
            ref={tipLabel}
            x="8"
            y="3"
            className="fill-[var(--color-ink)] text-[9px] tracking-[0.12em]"
            style={{ whiteSpace: "pre" }}
          >
            {START} {START - BORN}歳
          </text>
        )}
      </g>
    </svg>
  );
}
