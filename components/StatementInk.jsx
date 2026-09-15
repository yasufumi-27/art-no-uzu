"use client";

import { useEffect, useRef } from "react";

// About の Statement。スクロールに合わせて、文字にインクが染み込むように
// 左から右へ、薄いグレー → 墨色へと満ちていく（読んでいる位置まで色が付く）。
// 「渦を80年描き続けた、100歳のおばあちゃん」の一文は少し大きく強調する。
// 色の満ち具合は各行の --p（0〜1）。見た目は globals.css の .statement-line
export default function StatementInk({ paragraphs, emphasis }) {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const lines = [...el.querySelectorAll(".statement-line")];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      lines.forEach((l) => l.style.setProperty("--p", 1));
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const l of lines) {
        const r = l.getBoundingClientRect();
        // 行が画面の下から 85% の位置に来たら染み始め、55% の位置で満ちきる
        const p = (vh * 0.85 - r.top) / (vh * 0.3);
        l.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(3));
      }
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
    <div ref={root} className="space-y-6 text-sm leading-loose">
      {paragraphs.map((lines, i) => (
        <p key={i}>
          {lines.map((line, j) => (
            <span key={j} className="block">
              <span
                className={`statement-line ${
                  line === emphasis ? "text-sm tracking-[0.06em] sm:text-base sm:tracking-[0.12em] md:text-lg" : ""
                }`}
              >
                {line}
              </span>
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}
