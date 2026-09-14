"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import FadeImg from "@/components/FadeImg";
import InstagramBadge from "@/components/InstagramBadge";
import { works, workAlt } from "@/lib/works";

// index の Works / Exhibition。訪問ごとにランダムで9作品を選ぶ（#3）。
// SSR ではハイドレーション不一致を避けるため決定的に先頭9件を描画し、
// マウント後にクライアント側でシャッフルして差し替える。
function pickRandom(list, n) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

export default function FeaturedWorks() {
  const [items, setItems] = useState(() => works.slice(0, 9));
  const gridRef = useRef(null);
  const [preview, setPreview] = useState(null);

  // ホバーした作品を拡大表示（打ち合わせメモ）：横は3列分、縦はその作品を中心に上下へ半段ずつ
  // （＝上の段の中央から下の段の中央まで）。一覧からはみ出す場合は高さを保ったまま内側へずらす。PCのみ。
  const showPreview = (el, work) => {
    const grid = gridRef.current;
    if (!grid || !window.matchMedia("(hover: hover) and (min-width: 640px)").matches) return;
    const g = grid.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const gap = parseFloat(getComputedStyle(grid).rowGap) || 0;
    const rowH = r.height + gap;
    const center = r.top - g.top + r.height / 2;
    let top = center - rowH;
    let bottom = center + rowH;
    if (top < 0) { bottom -= top; top = 0; }
    if (bottom > g.height) { top = Math.max(0, top - (bottom - g.height)); bottom = g.height; }
    setPreview({ work, top, height: bottom - top });
  };

  useEffect(() => {
    setItems(pickRandom(works, 9));
  }, []);

  return (
    <div
      ref={gridRef}
      className="relative grid grid-cols-3 gap-2 sm:gap-4 md:gap-6"
      onMouseLeave={() => setPreview(null)}
    >
      {items.map((work, i) => {
        const inner = (
          <div className="zoom-card relative aspect-square overflow-hidden bg-[var(--color-line)]">
            <FadeImg
              src={work.thumb}
              alt={workAlt(work)}
              className="h-full w-full object-cover"
            />
            {!work.hasDetail && <InstagramBadge label={work.linkLabel} small />}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/55 to-transparent p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <p className="text-[0.5625rem] tracking-[0.2em] text-white/70">
                {work.category}
              </p>
              <p className="text-[0.6875rem] tracking-wider-jp text-white line-clamp-1">
                {work.title || work.year}
              </p>
            </div>
          </div>
        );
        return (
          <Reveal key={work.id} delay={(i % 3) * 0.08}>
            {/* 作品ページあり→詳細へ、なし→Instagram へ（#1） */}
            {work.hasDetail ? (
              <Link
                href={`/works/${work.id}`}
                className="group block"
                onMouseEnter={(e) => showPreview(e.currentTarget, work)}
              >
                {inner}
              </Link>
            ) : (
              <a
                href={work.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
                onMouseEnter={(e) => showPreview(e.currentTarget, work)}
              >
                {inner}
              </a>
            )}
          </Reveal>
        );
      })}
      {preview && (
        <div
          key={preview.work.id}
          className="preview-in pointer-events-none absolute left-0 z-40 flex w-full items-center justify-center bg-[var(--color-bg)]/95 shadow-[0_10px_40px_rgba(0,0,0,0.12)]"
          style={{ top: preview.top, height: preview.height }}
        >
          <img
            src={preview.work.images[0]}
            alt=""
            className="h-full w-full object-contain p-3"
          />
          <span className="absolute bottom-3 right-3 bg-black/70 px-2 py-1 text-[0.625rem] tracking-wider-jp text-white">
            {preview.work.title || preview.work.year} · {preview.work.linkLabel} ↗
          </span>
        </div>
      )}
    </div>
  );
}
