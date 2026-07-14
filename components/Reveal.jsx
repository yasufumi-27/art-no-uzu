"use client";

import { useEffect, useRef } from "react";

// スクロール連動のフェードイン（仕様書 15「フェードイン表示」/ 16 軽量アニメーション）。
// 初期表示速度を最優先するため（仕様書 16）、外部ライブラリを使わず
// IntersectionObserver + CSS トランジションのみで実装する。
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // reduced-motion 時はアニメーションなしで即表示（クラスを付けない）
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    el.style.transitionDelay = `${delay}s`;
    el.classList.add("reveal-init");

    // 完了後はクラスを除去して素の状態に戻す
    // （filter が残ると子要素のホバー拡大が切り取られるため）
    const onEnd = (e) => {
      if (e.target !== el || e.propertyName !== "opacity") return;
      el.classList.remove("reveal-init", "reveal-in");
      el.style.transitionDelay = "";
      el.removeEventListener("transitionend", onEnd);
    };
    el.addEventListener("transitionend", onEnd);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("reveal-in");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      el.removeEventListener("transitionend", onEnd);
    };
  }, [delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
