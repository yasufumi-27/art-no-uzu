"use client";

import { useEffect, useRef, useState } from "react";
import { placeholder } from "@/lib/placeholder";
import Spiral from "@/components/Spiral";

// TOP メインビジュアル（仕様書 8）。
// 実在作品をスライド表示。フェードイン/アウトで切替、自動 + 手動。
// 初期ロード時：作品画像がゆっくりフェードイン、タイトルは一文字ずつ立ち上がる。
const SLIDES = [
  { id: "w-uzu-jyuku", title: "生まれた喜び『淑』", year: 2026 },
  { id: "w-uzu-kurage", title: "夜を泳ぐ海月", year: 2024 },
  { id: "w-uzu-kiri", title: "霧が晴れゆくように", year: 2021 },
];

const INTERVAL = 5600;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false); // 初期ロード時のゆっくりフェードイン用
  const timer = useRef(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const go = (next) => setIndex((next + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(timer.current);
  }, []);

  const current = SLIDES[index];

  return (
    <section className="relative w-full">
      <div className="relative w-full h-[76vh] md:h-[90vh] overflow-hidden bg-black">
        {SLIDES.map((slide, i) => (
          <img
            key={slide.id}
            src={placeholder(slide.id, 16 / 9)}
            alt={slide.title}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[2400ms] ease-in-out"
            style={{ opacity: ready && i === index ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

        {/* 渦モチーフ（ゆっくり回転） */}
        <div className="pointer-events-none absolute -right-24 -top-24 hidden h-[420px] w-[420px] text-white/25 md:block">
          <Spiral className="spin-slow h-full w-full" />
        </div>

        {/* キャプション：一文字ずつ立ち上がる */}
        <div className="absolute bottom-12 left-0 container-wide text-white">
          <p
            key={`y-${index}`}
            className="char font-display text-[11px] tracking-[0.3em] opacity-80"
            style={{ animationDelay: "0.1s" }}
          >
            {current.year}
          </p>
          <h1 className="mt-3 text-2xl md:text-4xl font-light tracking-wider-jp">
            {Array.from(current.title).map((ch, i) => (
              <span
                key={`${index}-${i}`}
                className="char"
                style={{ animationDelay: `${0.15 + i * 0.045}s` }}
              >
                {ch}
              </span>
            ))}
          </h1>
        </div>

        {/* 手動切替 */}
        <div className="absolute bottom-12 right-0 container-wide flex justify-end gap-3">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`スライド ${i + 1} へ`}
              onClick={() => go(i)}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === index ? 30 : 12,
                background: i === index ? "#fff" : "rgba(255,255,255,0.5)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
