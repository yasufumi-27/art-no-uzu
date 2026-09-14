"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import FadeImg from "@/components/FadeImg";
import InstagramBadge from "@/components/InstagramBadge";
import Spiral from "@/components/Spiral";
import ComingSoon from "@/components/ComingSoon";
import { workAlt } from "@/lib/works";

// Works / Exhibition 統合一覧（仕様書 9）。
// 西暦ボタンで年を切り替えて作品を表示（塩田千春サイト参考）。
// 詳細ページあり作品 → 詳細ページへ。なし作品 → 直接 Instagram へ（左上に instagram ラベル）。

function Card({ work, index, onPreview }) {
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
  const style = { animationDelay: `${(index % 8) * 0.09}s` };
  const hover = {
    onMouseEnter: (e) => onPreview?.(e.currentTarget, work),
    onMouseLeave: () => onPreview?.(null),
  };

  if (work.hasDetail) {
    return (
      <Link
        href={`/works/${work.id}`}
        className="work-in group block"
        style={style}
        {...hover}
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
      {...hover}
    >
      {inner}
    </a>
  );
}

// 作品画像を持たない関連リンク（エッセイ・受賞ページなど）を、作品と同じ正方形の文字カードで出す
function ExtraCard({ extra, index }) {
  return (
    <a
      href={extra.href}
      target="_blank"
      rel="noopener noreferrer"
      className="work-in group block"
      style={{ animationDelay: `${(index % 8) * 0.09}s` }}
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

  const gridRef = useRef(null);
  const [preview, setPreview] = useState(null);
  // PC（ホバー可能・3列表示）のときだけ拡大表示する
  const showPreview = (el, work) => {
    if (!el) return setPreview(null);
    const grid = gridRef.current;
    if (!grid || !window.matchMedia("(hover: hover) and (min-width: 640px)").matches) return;
    const gap = parseFloat(getComputedStyle(grid).rowGap) || 0;
    const rowH = el.offsetHeight + gap;
    const center = el.offsetTop + el.offsetHeight / 2;
    let top = center - rowH;
    let bottom = center + rowH;
    // 一覧の上下からはみ出す場合は、2段分の高さを保ったまま内側へずらす
    if (top < 0) { bottom -= top; top = 0; }
    if (bottom > grid.offsetHeight) { top = Math.max(0, top - (bottom - grid.offsetHeight)); bottom = grid.offsetHeight; }
    setPreview({ work, top, height: bottom - top });
  };

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
        <ComingSoon year={comingSoonYear} />
      ) : (
        // key に activeYear を含めることで、年切替時にグリッドが再アニメーション。
        <div
          key={activeYear}
          ref={gridRef}
          className="relative grid grid-cols-2 gap-4 sm:grid-cols-3"
          onMouseLeave={() => setPreview(null)}
        >
          {items.map((work, i) => (
            <Card key={work.id} work={work} index={i} onPreview={showPreview} />
          ))}
          {/* ホバー中の作品を拡大表示：横は3列分、縦は「上の段の中央」から「下の段の中央」まで（打ち合わせメモ） */}
          {preview && (
            <div
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
          {yearExtras.map((extra, i) => (
            <ExtraCard key={extra.href} extra={extra} index={items.length + i} />
          ))}
        </div>
      )}
    </div>
  );
}
