"use client";

import { useEffect, useRef } from "react";
import { spiralPath } from "@/components/Spiral";

// TOP 専用：画面右下に常駐する「80年分の渦」。
// ・ページのスクロール位置に合わせて、渦が中心から外へ描き足されていく（最上部で描き始め、最下部で描き切る）
// ・常にゆっくり回り続け、スクロールするとその勢いで回転が速まり、止めると元の速さへ戻っていく
// ・下の数字は 2015 → 2095 へ進む（2015年に描き始めた渦を、80年描き続けた先まで）
// ・色は背景を反転する合成（mix-blend-difference）で、明るい地でも作品写真の上でも見えるようにしている
const TURNS = 6;
const PATH = spiralPath(TURNS, 360, 92);
const START = 2015;
const YEARS = 80;

export default function ScrollSpiralGauge() {
  const svg = useRef(null);
  const path = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let angle = 0;
    let velocity = 0;
    let lastY = window.scrollY;
    let raf = 0;

    const progress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };

    const render = () => {
      const p = progress();
      path.current.style.strokeDashoffset = String(1 - p);
      label.current.textContent = String(START + Math.round(p * YEARS));
      svg.current.style.transform = `rotate(${angle}deg)`;
    };

    if (reduce) {
      const onScroll = () => render();
      render();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const loop = () => {
      const y = window.scrollY;
      // スクロール量を回転の勢いに変換し、少しずつ減衰させる
      velocity += (y - lastY) * 0.35;
      velocity *= 0.9;
      lastY = y;
      angle += 0.25 + velocity * 0.1;
      render();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="gauge-in pointer-events-none fixed bottom-5 right-5 z-30 flex flex-col items-center text-white mix-blend-difference md:bottom-8 md:right-8"
    >
      <svg ref={svg} viewBox="0 0 200 200" className="h-14 w-14 md:h-20 md:w-20">
        {/* 描かれる前の道筋（ごく薄く） */}
        <path d={PATH} fill="none" stroke="currentColor" strokeWidth="2" opacity="0.15" />
        <path
          ref={path}
          d={PATH}
          pathLength="1"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="1"
          strokeDashoffset="1"
          opacity="0.85"
        />
      </svg>
      <span
        ref={label}
        className="mt-1 text-[0.5625rem] tabular-nums tracking-[0.2em] opacity-80 md:text-[0.625rem]"
      >
        {START}
      </span>
    </div>
  );
}
