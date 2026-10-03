"use client";

import { useState } from "react";
import Link from "next/link";
import FadeImg from "@/components/FadeImg";
import InstagramBadge from "@/components/InstagramBadge";
import Spiral from "@/components/Spiral";
import ComingSoon from "@/components/ComingSoon";
import { workAlt } from "@/lib/works";

// Works / Exhibition 統合一覧（仕様書 9）。
// 西暦ボタンで年を切り替えて作品を表示（塩田千春サイト参考）。
// 詳細ページあり作品 → 詳細ページへ。なし作品 → 直接 Instagram へ（左上に instagram ラベル）。

// 並び順・サイズは固定。余白だけ数px変化させ、再描画でも配置が動かない。
function cardStyle(index, year) {
  const slot = (index * 5 + year) % 6;
  return {
    animationDelay: `${(index % 8) * 0.09}s`,
    "--card-x": `${[0, 3, -2, 1, -3, 2][slot]}px`,
    "--card-y": `${[0, 6, 2, -4, 4, -2][slot]}px`,
  };
}

function Card({ work, index }) {
  const inner = (
    <div className="zoom-card relative aspect-square w-full overflow-hidden bg-[var(--color-line)]">
      <FadeImg
        src={work.thumb}
        alt={workAlt(work)}
        className="h-full w-full object-cover"
      />
      {work.category === "Exhibition" && (
        <span className="absolute left-3 top-3 bg-black/70 px-2 py-1 text-[0.625rem] tracking-wider-jp text-white">
          Exhibition
        </span>
      )}
      {/* 詳細ページを持たない作品は Instagram へ誘導するラベルを表示 */}
      {!work.hasDetail && <InstagramBadge label={work.linkLabel} />}
      {/* フォーカス時：作品名 */}
      {work.title && (
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
          <p className="text-xs tracking-wider-jp text-white">{work.title}</p>
        </div>
      )}
    </div>
  );

  // 登場アニメーション（#7）。年切替時に再生されるよう key は呼び出し側で制御。
  const style = cardStyle(index, work.year);

  if (work.hasDetail) {
    return (
      <Link
        href={`/works/${work.id}`}
        className={`work-in group block ${work.category === "Exhibition" ? "exhibition-card" : ""}`}
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
      className={`work-in group block ${work.category === "Exhibition" ? "exhibition-card" : ""}`}
      style={style}
    >
      {inner}
    </a>
  );
}

// 関連リンクは表紙画像を優先し、画像のない受賞ページなどは文字カードで出す
function ExtraCard({ extra, index }) {
  if (extra.image) {
    return (
      <a href={extra.href} target="_blank" rel="noopener noreferrer"
        className="work-in group block"
        style={cardStyle(index, extra.year)}>
        <div className="zoom-card relative aspect-square w-full overflow-hidden bg-white">
          <FadeImg src={extra.image} alt={`${extra.title}の表紙`} className="h-full w-full object-contain" />
          <span className="absolute left-3 top-3 bg-black/70 px-2 py-1 text-[0.625rem] tracking-wider-jp text-white">{extra.kind} ↗</span>
        </div>
        <p className="mt-3 text-xs leading-snug tracking-wider-jp">{extra.title}</p>
      </a>
    );
  }
  return (
    <a
      href={extra.href}
      target="_blank"
      rel="noopener noreferrer"
      className="work-in group block"
      style={cardStyle(index, extra.year)}
    >
      <div className="zoom-card relative flex aspect-square w-full flex-col justify-between overflow-hidden border border-[var(--color-line)] bg-white p-4 md:p-5">
        <span className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 text-[var(--color-line)]">
          <Spiral className="spin-slow h-full w-full" />
        </span>
        <p className="relative text-[0.625rem] tracking-[0.2em] text-[var(--color-muted)]">
          {extra.kind} ↗
        </p>
        <div className="relative">
          <p className="text-sm leading-snug tracking-wider-jp md:text-base">
            {extra.title}
          </p>
          <p className="mt-2 text-[0.625rem] leading-relaxed tracking-wider-jp text-[var(--color-muted)]">
            {extra.note}
          </p>
        </div>
      </div>
    </a>
  );
}

export default function WorksGrid({
  works,
  years,
  comingSoonYear,
  initialYear,
  extras = [],
}) {
  // 左端を 2027（Coming Soon）とし、以降 2026 → 2015 の降順。
  const tabs = [comingSoonYear, ...years];
  const valid = tabs.includes(initialYear) ? initialYear : years[0];
  const [activeYear, setActiveYear] = useState(valid);

  const items = works.filter((w) => w.year === activeYear);
  const yearExtras = extras.filter((e) => e.year === activeYear);
  const isComingSoon = activeYear === comingSoonYear;
  const cards = [
    ...items.map(work => ({ id: work.id, work })),
    ...yearExtras.map(extra => ({ id: extra.href, extra })),
  ];


  return (
    <div className="works-archive">
      {/* 西暦ボタン */}
      {/* スマホは7列の格子で2行に収める（2026-09-15：3行目に1年だけ残っていた） */}
      <div className="mb-14 grid grid-cols-7 gap-y-3 border-b border-[var(--color-line)] pb-6 text-[13px] tracking-[0.08em] sm:flex sm:flex-wrap sm:gap-x-5 sm:text-sm sm:tracking-[0.22em]">
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
        <ComingSoon year={comingSoonYear} />
      ) : (
        // key に activeYear を含めることで、年切替時にグリッドが再アニメーション。
        <div
          key={activeYear}
          className="works-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        >
          {cards.map((card, i) => card.work
            ? <Card key={card.id} work={card.work} index={i} />
            : <ExtraCard key={card.id} extra={card.extra} index={i} />)}
        </div>
      )}
    </div>
  );
}
