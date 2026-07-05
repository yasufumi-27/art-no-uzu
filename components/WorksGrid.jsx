"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { placeholder } from "@/lib/placeholder";

// Works / Exhibition 統合一覧（仕様書 9）。
// 西暦ボタンで年を切り替えて作品を表示（塩田千春サイト参考）。
// 作品フォーカス時は画面全体に作品画像を表示するポップアップ（文言は作品名のみ）。

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
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 animate-[fadeIn_0.4s_ease]"
      onClick={onClose}
    >
      <button
        aria-label="閉じる"
        onClick={onClose}
        className="absolute right-6 top-6 text-2xl text-white/70 hover:text-white"
      >
        ×
      </button>
      <img
        src={placeholder(work.id, 3 / 2)}
        alt={work.title}
        className="max-h-[82vh] max-w-[92vw] object-contain"
        onClick={(e) => e.stopPropagation()}
      />
      <p className="mt-6 text-sm tracking-wider-jp text-white">{work.title}</p>
    </div>
  );
}

function Card({ work, onOpen }) {
  const inner = (
    <div className="relative aspect-square w-full overflow-hidden bg-[var(--color-line)]">
      <img
        src={placeholder(work.id, 1)}
        alt={work.title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
      {work.category === "Exhibition" && (
        <span className="absolute left-3 top-3 bg-black/70 px-2 py-1 text-[10px] tracking-wider-jp text-white">
          Exhibition
        </span>
      )}
      {/* フォーカス時：作品名のみ表示 */}
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <p className="text-xs tracking-wider-jp text-white">{work.title}</p>
      </div>
    </div>
  );

  // 詳細ページあり作品は詳細へ、なし作品は全画面ポップアップ。
  if (work.hasDetail) {
    return (
      <Link href={`/works/${work.id}`} className="group block">
        {inner}
      </Link>
    );
  }
  return (
    <button onClick={() => onOpen(work)} className="group block text-left">
      {inner}
    </button>
  );
}

export default function WorksGrid({ works, years, comingSoonYear }) {
  // 左端を 2027（Coming Soon）とし、以降 2026 → 2015 の降順。
  const tabs = [comingSoonYear, ...years];
  const [activeYear, setActiveYear] = useState(years[0]);
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
            className={`underline-offset-4 transition-colors hover:text-[var(--color-ink)] ${
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
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {items.map((work) => (
            <Card key={work.id} work={work} onOpen={setLightbox} />
          ))}
        </div>
      )}

      {lightbox && (
        <Lightbox work={lightbox} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}
