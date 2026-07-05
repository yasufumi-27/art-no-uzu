"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { placeholder } from "@/lib/placeholder";

// TOP メインビジュアル（仕様書 8）。
// スライド形式・フェードイン/フェードアウトで画像を切り替え、自動 + 手動切替に対応。
const SLIDES = [
  { id: "w-2026-01", title: "静寂の残響", year: 2026 },
  { id: "e-2025-01", title: "個展「間 — Ma」", year: 2025 },
  { id: "w-2024-01", title: "白の重力", year: 2024 },
];

const INTERVAL = 5000;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false); // 初期ロード時のゆっくりフェードイン用
  const captionRef = useRef(null);
  const timer = useRef(null);

  useEffect(() => {
    const t = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const go = (next) => {
    setIndex((prev) => (next + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(timer.current);
  }, []);

  useEffect(() => {
    if (!captionRef.current) return;
    gsap.fromTo(
      captionRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 1.1, ease: "power2.out" }
    );
  }, [index]);

  return (
    <section className="relative w-full">
      <div className="relative w-full h-[70vh] md:h-[86vh] overflow-hidden bg-black">
        {SLIDES.map((slide, i) => (
          <img
            key={slide.id}
            src={placeholder(slide.id, 16 / 9)}
            alt={slide.title}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[2200ms] ease-in-out"
            style={{ opacity: ready && i === index ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <div
          ref={captionRef}
          key={index}
          className="absolute bottom-10 left-0 container-wide text-white"
        >
          <p className="text-[11px] tracking-wider-jp opacity-80">
            {SLIDES[index].year}
          </p>
          <h1 className="mt-2 text-xl md:text-3xl font-light tracking-wider-jp">
            {SLIDES[index].title}
          </h1>
        </div>

        {/* 手動切替 */}
        <div className="absolute bottom-10 right-0 container-wide flex justify-end gap-3">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`スライド ${i + 1} へ`}
              onClick={() => go(i)}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === index ? 28 : 12,
                background: i === index ? "#fff" : "rgba(255,255,255,0.5)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
