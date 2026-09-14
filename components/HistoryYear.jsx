"use client";

import { useEffect, useRef, useState } from "react";
import Spiral from "@/components/Spiral";

// About の History の1年分。画面に入ると：
//   1. 年の横で小さな渦がひと巻き描かれ、年が現れる
//   2. 年の右の細い線が左から伸びる
//   3. 項目が1行ずつ、ペン先（細い縦線）が左から右へ走り、その軌跡に文字が書き出されるように現れる
// どの年も常に読める状態のまま（ホバーで他を薄くするような演出はしない）。見た目は globals.css の .history-*
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
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={`history-year mb-9 break-inside-avoid ${inView ? "is-in" : ""}`}>
      <h3 className="flex items-center gap-2 text-[0.6875rem] tracking-[0.25em] text-[var(--color-muted)]">
        <span className="history-mark inline-block h-3.5 w-3.5 shrink-0">
          <Spiral turns={3} strokeWidth={10} className="h-full w-full" pathClassName="history-mark-path" />
        </span>
        <span className="history-yeartext">{year}</span>
        <span className="history-line h-px flex-1 bg-[var(--color-line)]" />
      </h3>
      {children}
    </section>
  );
}
