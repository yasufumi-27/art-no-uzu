"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { placeholder } from "@/lib/placeholder";

// Works / Exhibition 統合一覧（仕様書 9）。
// 西暦ボタンで年を切り替えて作品を表示（塩田千春サイト参考）。
// 作品フォーカス時はライトボックスで概要付きの大画像を表示。

function Lightbox({ work, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 p-6 animate-[fadeIn_0.7s_ease]"
      onClick={onClose}
    >
      <button
        aria-label="閉じる"
        onClick={onClose}
        className="absolute right-6 top-6 text-2xl text-white/70 hover:text-white"
      >
        ×
      </button>

      <div
        className="flex max-h-[88vh] w-full max-w-5xl flex-col items-center gap-6 overflow-y-auto md:flex-row md:items-center md:gap-10"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={placeholder(work.id, 3 / 2)}
          alt={work.title}
          className="max-h-[62vh] w-auto max-w-full object-contain md:max-h-[80vh] md:flex-1"
        />
        {/* 概要 */}
        <div className="w-full text-white md:max-w-xs md:flex-shrink-0">
          {work.category === "Exhibition" && (
            <span className="inline-block bg-white/15 px-2 py-1 text-[10px] tracking-wider-jp">
              Exhibition
            </span>
          )}
          <p className="mt-3 text-[11px] tracking-[0.2em] text-white/60">
            {work.year}
            {work.series ? ` ・ ${work.series}` : ""}
          </p>
          <h3 className="mt-2 text-base tracking-wider-jp">{work.title}</h3>
          <p className="mt-4 text-xs leading-loose text-white/80">
            {work.description}
          </p>
          {work.material && (
            <p className="mt-4 text-[11px] tracking-wider-jp text-white/50">
              {work.material}
              {work.size ? ` / ${work.size}` : ""}
            </p>
          )}
          {/* 作品ページのない作品には Instagram リンク */}
          <a
            href={work.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block border-b border-white/60 pb-1 text-xs tracking-wider-jp text-white transition-opacity hover:opacity-70"
          >
            Instagram で見る →
          </a>
        </div>
      </div>
    </div>
  );
}

function Card({ work, onOpen, index }) {
  const inner = (
    <div className="relative aspect-square w-full overflow-hidden bg-[var(--color-line)]">
      <img
        src={placeholder(work.id, 1)}
        alt={work.title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
      />
      {work.category === "Exhibition" && (
        <span className="absolute left-3 top-3 bg-black/70 px-2 py-1 text-[10px] tracking-wider-jp text-white">
          Exhibition
        </span>
      )}
      {/* フォーカス時：作品名 */}
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
        <p className="text-xs tracking-wider-jp text-white">{work.title}</p>
      </div>
    </div>
  );

  // 登場アニメーション（#7）。年切替時に再生されるよう key は呼び出し側で制御。
  const style = { animationDelay: `${(index % 8) * 0.09}s` };

  // 詳細ページあり作品は詳細へ、なし作品はライトボックス。
  if (work.hasDetail) {
    return (
      <Link
        href={`/works/${work.id}`}
        className="work-in group block"
        style={style}
      >
        {inner}
      </Link>
    );
  }
  return (
    <button
      onClick={() => onOpen(work)}
      className="work-in group block text-left"
      style={style}
    >
      {inner}
    </button>
  );
}

export default function WorksGrid({
  works,
  years,
  comingSoonYear,
  initialYear,
}) {
  // 左端を 2027（Coming Soon）とし、以降 2026 → 2015 の降順。
  const tabs = [comingSoonYear, ...years];
  const valid = tabs.includes(initialYear) ? initialYear : years[0];
  const [activeYear, setActiveYear] = useState(valid);
  const [lightbox, setLightbox] = useState(null);

  const items = works.filter((w) => w.year === activeYear);
  const isComingSoon = activeYear === comingSoonYear;

  return (
    <div>
      {/* 西暦ボタン */}
      <div className="mb-14 flex flex-wrap gap-x-5 gap-y-3 border-b border-[var(--color-line)] pb-6 text-sm tracking-wider-jp">
        {tabs.map((year) => (
          <button
            key={year}
            onClick={() => setActiveYear(year)}
            className={`nav-link underline-offset-4 transition-colors hover:text-[var(--color-ink)] ${
              activeYear === year
                ? "font-medium text-[var(--color-ink)] underline"
                : "text-[var(--color-muted)]"
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      <p className="mb-8 text-lg font-light tracking-wider-jp text-[var(--color-muted)]">
        {activeYear}
      </p>

      {isComingSoon ? (
        <div className="flex aspect-[3/1] w-full items-center justify-center border border-dashed border-[var(--color-line)]">
          <p className="text-sm tracking-wider-jp text-[var(--color-muted)]">
            Coming Soon
          </p>
        </div>
      ) : (
        // key に activeYear を含めることで、年切替時にグリッドが再アニメーション。
        <div
          key={activeYear}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
        >
          {items.map((work, i) => (
            <Card key={work.id} work={work} onOpen={setLightbox} index={i} />
          ))}
        </div>
      )}

      {lightbox && (
        <Lightbox work={lightbox} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}
