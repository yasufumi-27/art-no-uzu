"use client";

import { useEffect, useRef, useState } from "react";

// TOP 専用：「一本の線の人生」。
// ページ全体を 21歳（2015年、渦を描き始めた年）から 100歳（2094年）までの80年に見立て、一本の墨の線で描く。
// ・スクロールに合わせて、ペン先が「いま読んでいる位置」まで線を描き進める（操作していないときは静止）
// ・10年ごと（30歳〜100歳）に、線がその場で渦をひと巻き描いてから先へ進む。年を重ねるほど渦は大きく、巻き数も増える
// ・年を取るにつれて線がわずかに震えていく（筆跡そのものが80年分老いていく）
// ・ペン先には今の年と年齢が付いてきて、描き終えた節目には記録が残る
//
// 表示は画面幅で2通り（進み方・年の対応はどちらも同じ）：
// ・PC（左の余白が十分ある）：メインビジュアルの下からページ末尾まで、左の余白に縦に描く
// ・スマホ・狭い画面：余白がないため、メニューの直下に横一本の帯として固定し、左→右へ描く
//   （2026-09-15：iPhone では余白が 20px しかなく、PC と別物の見え方になっていたため）
const START = 2015;
const BORN = 1994;
const YEARS = 79; // 2015 → 2094
const STEP = 0.02; // 年単位のサンプリング間隔
const LOOP_HALF = 0.9; // 節目の渦を描くのに使う年数の半分
const CONTENT_WIDTH = 1180; // globals.css の --content-width と同じ
const GUTTER_MIN = 70; // これより余白が狭い画面は横帯表示
const BAND_HEIGHT = 44;

// 節目：30歳, 40歳, … 100歳
const MILESTONES = Array.from({ length: 8 }, (_, k) => {
  const age = 30 + k * 10;
  return { k, age, year: BORN + age, t: BORN + age - START };
});

// 年齢とともに増していく手の震え
function tremble(t, scale) {
  const age = t / YEARS;
  const amp = (0.15 + age * age * 2.4) * scale;
  return amp * Math.sin(t * 23.7) + amp * 0.6 * Math.sin(t * 61.3 + 1.7);
}

// 節目の渦の半径：年を重ねるほど大きく
function loopRadius(mode, size, k) {
  return mode === "band" ? Math.min(BAND_HEIGHT * 0.36, 6 + k * 1.4) : Math.min(size * 0.42, 10 + k * 5);
}

// mode: "gutter"（縦・size=余白の幅, length=ページの高さ） / "band"（横・size=帯の高さ, length=画面の幅）
function build(mode, size, length) {
  const pts = [];
  const pad = mode === "band" ? 16 : 0;
  // 帯では、最後（100歳）の渦が右端で切れないよう、その直径ぶん右側を空けておく
  const span = mode === "band" ? length - pad * 2 - loopRadius("band", size, 7) * 2 : length - pad * 2;
  const mid = size / 2;
  for (let t = 0; t <= YEARS + 1e-9; t += STEP) {
    const along = pad + (t / YEARS) * span; // 進行方向の位置
    let across = mid + tremble(t, mode === "band" ? 0.6 : 1); // 進行方向と直角の位置
    let pos = along;
    const m = MILESTONES.find((m) => Math.abs(t - m.t) <= LOOP_HALF);
    if (m) {
      // 節目：線の上の点から渦を描き出し、また線へ戻ってくる
      const u = (t - (m.t - LOOP_HALF)) / (LOOP_HALF * 2);
      const turns = 1.5 + m.k * 0.5;
      const r = loopRadius(mode, size, m.k) * Math.sin(Math.PI * u);
      const a = u * turns * Math.PI * 2 - Math.PI / 2;
      across += r * Math.cos(a);
      pos = pad + (m.t / YEARS) * span + r * Math.sin(a) + r;
    }
    pts.push(mode === "band" ? [pos, across] : [across, pos]);
  }
  // 線全体の d と、各点までの文字数（ペン先までの線は d をその位置で切り出して描く）
  let d = "";
  const ends = [];
  for (let i = 0; i < pts.length; i++) {
    d += `${i ? "L" : "M"}${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)}`;
    ends.push(d.length);
  }
  return { d, pts, ends, pad, span };
}

export default function LifeLine() {
  const [geo, setGeo] = useState(null);
  const line = useRef(null);
  const tip = useRef(null);
  const tipLabel = useRef(null);
  const marks = useRef([]);
  const data = useRef(null);

  // 画面幅・ページの高さに合わせて線を組み立てる
  useEffect(() => {
    let timer = 0;
    let lastKey = "";
    const measure = () => {
      const vw = document.documentElement.clientWidth;
      const gutter = Math.min(160, (vw - CONTENT_WIDTH) / 2 + 24);
      const mode = gutter >= GUTTER_MIN ? "gutter" : "band";
      // メインビジュアル（最初の section）の下端から、ページ末尾までを80年とする
      const hero = document.querySelector("main section");
      const top = hero ? hero.getBoundingClientRect().bottom + window.scrollY : 0;
      const pageHeight = document.documentElement.scrollHeight - top;
      const header = document.querySelector("header");
      const headerH = header ? header.getBoundingClientRect().height : 0;
      // スマホのアドレスバーの伸縮ではページの長さが変わらないので、線は作り直さない
      const key = `${mode}:${vw}:${Math.round(pageHeight)}`;
      if (key === lastKey) return;
      lastKey = key;
      const g = mode === "band" ? build("band", BAND_HEIGHT, vw) : build("gutter", gutter, pageHeight);
      data.current = g;
      setGeo({
        mode,
        width: mode === "band" ? vw : gutter,
        height: mode === "band" ? BAND_HEIGHT : pageHeight,
        top,
        pageHeight,
        headerH,
      });
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
      // 画面の中ほど（上から55%）の位置まで描き進める（PC・スマホ共通）。
      // ページ最下部で必ず100歳に届くよう、スクロールが進むほど描き進める位置を画面の下端へ寄せていく
      const vh = window.innerHeight;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh);
      const progress = Math.min(1, window.scrollY / maxScroll);
      const target = window.scrollY + vh * (0.55 + 0.45 * progress * progress) - geo.top;
      const t = Math.min(YEARS, Math.max(0, (target / geo.pageHeight) * YEARS));
      const i = Math.min(g.pts.length - 1, Math.round(t / STEP));
      // ペン先までの線だけを描く。stroke-dasharray で隠す方式は iOS の Safari で効かず、
      // 先の線まで最初から見えてしまったため（2026-09-15）、d を切り出す方式にしている
      line.current.setAttribute("d", g.d.slice(0, g.ends[i]));
      const [x, y] = g.pts[i];
      tip.current.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
      const year = START + Math.floor(t);
      if (tipLabel.current) {
        tipLabel.current.textContent = `${year}  ${year - BORN}歳`;
        if (geo.mode === "band") {
          // 帯では、ペン先が右端に近づいたら年齢表示を左側に回す
          const right = x > geo.width - 90;
          tipLabel.current.setAttribute("x", right ? "-8" : "8");
          tipLabel.current.setAttribute("text-anchor", right ? "end" : "start");
        }
      }
      // 100歳の節目は線の終点と重なるので、終点に届いた時点で記録を出す
      marks.current.forEach((el, k) => el?.classList.toggle("is-drawn", t >= Math.min(YEARS, MILESTONES[k].t + LOOP_HALF)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [geo]);

  if (!geo) return null;
  const band = geo.mode === "band";
  const g = data.current;

  return (
    <svg
      aria-hidden="true"
      className={
        band
          ? "pointer-events-none fixed left-0 z-30 text-white mix-blend-difference"
          : "pointer-events-none absolute left-0 z-20 text-[var(--color-ink)]"
      }
      width={geo.width}
      height={geo.height}
      style={{ overflow: "visible", top: band ? geo.headerH : geo.top }}
    >
      <path
        ref={line}
        d={g.d.slice(0, g.ends[0])}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={band ? 0.8 : 0.55}
      />
      {MILESTONES.map((m, k) => {
        const r = loopRadius(geo.mode, band ? BAND_HEIGHT : geo.width, k);
        return band ? (
          <text
            key={m.age}
            ref={(el) => (marks.current[k] = el)}
            x={g.pad + (m.t / YEARS) * g.span + r}
            y={BAND_HEIGHT - 1}
            textAnchor="middle"
            className="lifeline-mark fill-current text-[8px] tracking-[0.05em]"
          >
            {m.age}
          </text>
        ) : (
          <text
            key={m.age}
            ref={(el) => (marks.current[k] = el)}
            x={geo.width / 2 + r + 6}
            y={(m.t / YEARS) * geo.height + r * 2 + 14}
            className="lifeline-mark fill-[var(--color-muted)] text-[9px] tracking-[0.15em]"
          >
            {m.year} / {m.age}歳
          </text>
        );
      })}
      <g ref={tip}>
        <circle r="2.5" fill="currentColor" />
        <text
          ref={tipLabel}
          x="8"
          y={band ? -8 : 3}
          className={band ? "fill-current text-[9px] tracking-[0.08em]" : "fill-[var(--color-ink)] text-[9px] tracking-[0.12em]"}
          style={{ whiteSpace: "pre" }}
        >
          {START} {START - BORN}歳
        </text>
      </g>
    </svg>
  );
}
