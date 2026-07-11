"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { placeholder } from "@/lib/placeholder";

// 作品詳細の画像ギャラリー（仕様書 10.1）。スライダー形式・切替アニメーションあり。
// 画像は自動で切り替わり（#5）、手動操作するとタイマーはリセットされる。
const AUTO_INTERVAL = 5500;

export default function Gallery({ id, count = 3 }) {
  const [index, setIndex] = useState(0);
  const imgRef = useRef(null);
  const timer = useRef(null);
  const slides = Array.from({ length: count }, (_, i) => `${id}-${i}`);

  useEffect(() => {
    if (!imgRef.current) return;
    gsap.fromTo(
      imgRef.current,
      { opacity: 0.15, scale: 1.03 },
      { opacity: 1, scale: 1, duration: 1.6, ease: "power2.out" }
    );
  }, [index]);

  // 自動切替
  useEffect(() => {
    if (count <= 1) return;
    timer.current = setInterval(() => {
      setIndex((p) => (p + 1) % count);
    }, AUTO_INTERVAL);
    return () => clearInterval(timer.current);
  }, [count]);

  const resetTimer = () => {
    if (!timer.current || count <= 1) return;
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      setIndex((p) => (p + 1) % count);
    }, AUTO_INTERVAL);
  };

  const go = (dir) => {
    setIndex((p) => (p + dir + slides.length) % slides.length);
    resetTimer();
  };

  const select = (i) => {
    setIndex(i);
    resetTimer();
  };

  return (
    <div>
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-line)]">
        <img
          ref={imgRef}
          src={placeholder(slides[index], 4 / 3)}
          alt={`作品画像 ${index + 1}`}
          className="h-full w-full object-cover"
        />
        {count > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="前の画像"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 px-3 py-2 text-xs hover:bg-white"
            >
              ←
            </button>
            <button
              onClick={() => go(1)}
              aria-label="次の画像"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 px-3 py-2 text-xs hover:bg-white"
            >
              →
            </button>
          </>
        )}
      </div>
      {count > 1 && (
        <div className="mt-4 flex gap-2">
          {slides.map((s, i) => (
            <button
              key={s}
              onClick={() => select(i)}
              aria-label={`画像 ${i + 1}`}
              className="h-1 flex-1 transition-colors"
              style={{
                background: i === index ? "var(--color-ink)" : "var(--color-line)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
