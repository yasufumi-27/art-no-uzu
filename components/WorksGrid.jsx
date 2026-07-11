"use client";

import { useState } from "react";
import Link from "next/link";
import { placeholder } from "@/lib/placeholder";

// Works / Exhibition 統合一覧（仕様書 9）。
// 西暦ボタンで年を切り替えて作品を表示（塩田千春サイト参考）。
// 詳細ページあり作品 → 詳細ページへ。なし作品 → 直接 Instagram へ（左上に instagram ラベル）。

function Card({ work, index }) {
  const inner = (
    <div className="zoom-card relative aspect-square w-full overflow-hidden bg-[var(--color-line)]">
      <img
        src={placeholder(work.id, 1)}
        alt={work.title}
        loading="lazy"
        className="h-full w-full object-cover"
      />
      {work.category === "Exhibition" && (
        <span className="absolute left-3 top-3 bg-black/70 px-2 py-1 text-[0.625rem] tracking-wider-jp text-white">
          Exhibition
        </span>
      )}
      {/* 詳細ページを持たない作品は Instagram へ誘導するラベルを表示 */}
      {!work.hasDetail && (
        <span className="absolute left-3 top-3 bg-black/70 px-2 py-1 text-[0.625rem] tracking-wider-jp text-white">
          instagram
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
  // 詳細ページなし → クリックで直接 Instagram へ（#3）
  return (
    <a
      href={work.instagram}
      target="_blank"
      rel="noopener noreferrer"
      className="work-in group block"
      style={style}
    >
      {inner}
    </a>
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

      <p className="mb-8 text-xl font-bold tracking-wider-jp text-[var(--color-muted)]">
        {activeYear}
      </p>

      {isComingSoon ? (
        // Coming Soon：文字が渦のように生まれるアニメーション（渦は背景に任せる）。
        <div className="relative flex aspect-[16/7] w-full items-center justify-center overflow-hidden">
          <div className="relative text-center">
            <p className="font-display text-3xl tracking-[0.35em] text-[var(--color-ink)] md:text-5xl">
              {[..."COMING"].map((c, i) => (
                <span
                  key={i}
                  className="cs-letter"
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  {c}
                </span>
              ))}
            </p>
            <p className="mt-3 font-display text-lg tracking-[0.5em] text-[var(--color-muted)] md:text-2xl">
              {[..."SOON"].map((c, i) => (
                <span
                  key={i}
                  className="cs-letter"
                  style={{ animationDelay: `${(6 + i) * 0.12}s` }}
                >
                  {c}
                </span>
              ))}
            </p>
            <p className="mt-6 text-[11px] tracking-wider-jp text-[var(--color-muted)] breathe">
              2027 — 新たな渦が、生まれる。
            </p>
          </div>
        </div>
      ) : (
        // key に activeYear を含めることで、年切替時にグリッドが再アニメーション。
        <div
          key={activeYear}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
        >
          {items.map((work, i) => (
            <Card key={work.id} work={work} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
