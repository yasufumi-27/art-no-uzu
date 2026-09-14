"use client";

import { useEffect, useRef, useState } from "react";

// About の History の1年分。画面に入ると：
//   1. 年の数字が1桁ずつダイヤルのように回って、その年で止まる
//   2. 年の右の細い線が左から伸びる
//   3. 項目が1行ずつ、字間が詰まりながら浮かび上がる（墨がにじんで落ち着くイメージ）
// マウスを乗せた年以外は薄くなる（globals.css の .history-grid）。
function Digit({ d, delay }) {
  return (
    <span className="history-digit" style={{ "--d": d, transitionDelay: `${delay}s` }}>
      <span className="history-digit-reel">
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i}>{i}</span>
        ))}
      </span>
    </span>
  );
}

export default function HistoryYear({ year, children }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={`history-year mb-9 break-inside-avoid ${inView ? "is-in" : ""}`}>
      <h3 className="flex items-center gap-3 text-[0.6875rem] tracking-[0.25em] text-[var(--color-muted)]">
        <span className="sr-only">{year}</span>
        <span aria-hidden="true" className="inline-flex">
          {String(year)
            .split("")
            .map((d, i) => (
              <Digit key={i} d={Number(d)} delay={i * 0.12} />
            ))}
        </span>
        <span className="history-line h-px flex-1 bg-[var(--color-line)]" />
      </h3>
      {children}
    </section>
  );
}
