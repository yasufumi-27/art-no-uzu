"use client";

import { useEffect, useRef } from "react";
import Spiral from "@/components/Spiral";

// 見出しの横に置く小さな渦。ページのスクロールに連動して横に移動しながら回転する
// （打ち合わせメモ：「ニュースなどのコーナー横に、スクロールで渦を連動して横動き」）。
// 見出しが画面下端から上端へ抜けるまでの進み具合で、トラックの左端 → 右端へ動く。
export default function ScrollUzu({ className = "" }) {
  const track = useRef(null);
  const dot = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const t = track.current;
      const d = dot.current;
      if (!t || !d) return;
      const rect = t.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
      const range = t.clientWidth - d.clientWidth;
      d.style.transform = `translateX(${progress * range}px) rotate(${progress * 540}deg)`;
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
  }, []);

  return (
    <span
      ref={track}
      aria-hidden="true"
      className={`relative inline-block h-[0.8em] w-[4em] shrink-0 align-middle ${className}`}
    >
      <span
        ref={dot}
        className="absolute left-0 top-0 block h-full aspect-square text-[var(--color-muted)] will-change-transform"
      >
        <Spiral strokeWidth={9} turns={3} className="h-full w-full" />
      </span>
    </span>
  );
}
