"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { placeholder } from "@/lib/placeholder";

// 作品詳細の画像ギャラリー（仕様書 10.1）。スライダー形式・切替アニメーションあり。
export default function Gallery({ id, count = 3 }) {
  const [index, setIndex] = useState(0);
  const imgRef = useRef(null);
  const slides = Array.from({ length: count }, (_, i) => `${id}-${i}`);

  useEffect(() => {
    if (!imgRef.current) return;
    gsap.fromTo(
      imgRef.current,
      { opacity: 0.2, scale: 1.02 },
      { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" }
    );
  }, [index]);

  const go = (dir) =>
    setIndex((p) => (p + dir + slides.length) % slides.length);

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
              onClick={() => setIndex(i)}
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
