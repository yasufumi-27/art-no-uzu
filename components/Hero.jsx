"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import Spiral from "@/components/Spiral";

// TOP メインビジュアル（仕様書 8）。
// クライアント提供の TOP 画像（2026-09 受領 top1〜5）をスライド表示。フェードイン/アウトで切替、自動 + 手動。
// title / year を入れるとキャプションを一文字ずつ立ち上げて表示する（空なら出さない）。
const SLIDES = [1, 2, 3, 4, 5].map((n) => ({
  id: `top${n}`,
  src: asset(`/images/top/top${n}.webp`),
  title: "",
  year: "",
}));

const INTERVAL = 8000;

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
      <div className="relative w-full h-[76vh] md:h-[90vh] overflow-hidden bg-transparent">
        {SLIDES.map((slide, i) => (
          <img
            key={slide.id}
            src={slide.src}
            alt={slide.title || "神谷佳美 作品"}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[3600ms] ease-in-out"
            style={{ opacity: ready && i === index ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

        {/* 渦モチーフ（ゆっくり回転） */}
        <div className="pointer-events-none absolute -right-24 -top-24 hidden h-[420px] w-[420px] text-white/25 md:block">
          <Spiral className="spin-slow h-full w-full" />
        </div>

        {/* キャプション：一文字ずつ立ち上がる */}
        {current.title && (
        <div className="absolute bottom-12 left-0 container-wide text-white">
          <p
            key={`y-${index}`}
            className="char font-display text-[0.6875rem] tracking-[0.3em] opacity-80"
            style={{ animationDelay: "0.1s" }}
          >
            {current.year}
          </p>
          <h1 className="mt-3 text-2xl md:text-4xl font-light tracking-wider-jp">
            {Array.from(current.title).map((ch, i) => (
              <span
                key={`${index}-${i}`}
                className="char"
                style={{ animationDelay: `${0.25 + i * 0.08}s` }}
              >
                {ch}
              </span>
            ))}
          </h1>
        </div>
        )}

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
