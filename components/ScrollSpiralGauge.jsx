"use client";

import { useEffect, useRef } from "react";

// TOP 専用：画面右下に常駐する「80年分の渦」。スクロールしている間だけ動き、操作していないときは静止する。
//
// ・渦は 80 個の点（＝2015〜2094年の1年ずつ）でできている。ページ全体を80年に見立て、
//   スクロール位置まで年が進むと、その年の点に墨が入り、中心から点どうしが線でつながっていく
// ・スクロールを始めると渦がふくらんで年と年齢が現れ、止めて少しすると元の小ささに戻る
// ・10年の節目（2024, 2034 …）を越えるたびに、その点から波紋が広がる
// ・渦の回転はスクロール位置で決まる（勝手に回り続けない）
// ・年齢は 1994年生まれとして計算（2094年＝100歳）
// ・色は背景を反転する合成（mix-blend-difference）で、明るい地でも作品写真の上でも見える
const COUNT = 80;
const START = 2015;
const BORN = 1994;
const TURNS = 4.5;
const SETTLE_MS = 900;

const POINTS = Array.from({ length: COUNT }, (_, i) => {
  const k = i / (COUNT - 1);
  const t = k * TURNS * Math.PI * 2;
  const r = 8 + k * 84;
  // サーバーとブラウザで小数の丸めがずれないよう、小数第2位で揃える
  return [+(100 + r * Math.cos(t)).toFixed(2), +(100 + r * Math.sin(t)).toFixed(2)];
});
const LINE = POINTS.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");

export default function ScrollSpiralGauge() {
  const root = useRef(null);
  const group = useRef(null);
  const line = useRef(null);
  const dots = useRef([]);
  const ripples = useRef(null);
  const year = useRef(null);
  const age = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let settle = 0;
    let lastIndex = -1;

    const render = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const index = Math.round(p * (COUNT - 1));

      group.current.setAttribute("transform", `rotate(${(p * 540).toFixed(2)} 100 100)`);
      line.current.style.strokeDashoffset = String(1 - index / (COUNT - 1));

      if (index !== lastIndex) {
        dots.current.forEach((d, i) => {
          d.dataset.state = i < index ? "past" : i === index ? "now" : "future";
        });
        year.current.textContent = String(START + index);
        age.current.textContent = `${START + index - BORN}歳`;
        // 10年の節目を越えたら波紋（ページを開いた直後の初回描画では出さない）
        if (!reduce && lastIndex !== -1 && Math.floor(index / 10) !== Math.floor(lastIndex / 10)) {
          const [x, y] = POINTS[index];
          const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          c.setAttribute("cx", x);
          c.setAttribute("cy", y);
          c.setAttribute("r", "6");
          c.setAttribute("class", "gauge-ripple");
          ripples.current.appendChild(c);
          setTimeout(() => c.remove(), 1200);
        }
        lastIndex = index;
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(render);
      if (reduce) return;
      root.current.classList.add("is-scrolling");
      clearTimeout(settle);
      settle = setTimeout(() => root.current?.classList.remove("is-scrolling"), SETTLE_MS);
    };

    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      clearTimeout(settle);
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="gauge gauge-in pointer-events-none fixed bottom-5 right-5 z-30 flex items-end gap-3 text-white mix-blend-difference md:bottom-8 md:right-8"
    >
      <div className="gauge-labels flex flex-col items-end text-right leading-tight">
        <span ref={year} className="gauge-year tabular-nums tracking-[0.15em]">
          {START}
        </span>
        <span ref={age} className="gauge-age text-[0.5625rem] tabular-nums tracking-[0.2em] opacity-70">
          {START - BORN}歳
        </span>
      </div>
      <svg viewBox="0 0 200 200" className="gauge-svg h-16 w-16 md:h-20 md:w-20" overflow="visible">
        <g ref={group}>
          <path
            ref={line}
            d={LINE}
            pathLength="1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1"
            strokeDashoffset="1"
            opacity="0.8"
          />
          {POINTS.map(([x, y], i) => (
            <circle
              key={i}
              ref={(el) => (dots.current[i] = el)}
              cx={x}
              cy={y}
              r={i % 10 === 9 ? 5 : 3.2}
              className="gauge-dot"
              data-state="future"
              data-decade={i % 10 === 9 ? "" : undefined}
            />
          ))}
          <g ref={ripples} />
        </g>
      </svg>
    </div>
  );
}
