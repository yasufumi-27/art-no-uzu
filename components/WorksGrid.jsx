"use client";

import { useState } from "react";
import Link from "next/link";
import { placeholder } from "@/lib/placeholder";

// Works / Exhibition 統合一覧（仕様書 9）。
// 3×3 グリッド、ホバーで概要ポップアップ、Exhibition ラベル、Coming Soon 対応。
// 専用詳細ページあり作品は詳細へ遷移、なし作品はポップアップ + Instagram 誘導。

function Card({ work }) {
  // スマホはタップでポップアップ開閉（仕様書 11）、PC はカーソルで開閉。
  const [open, setOpen] = useState(false);

  const inner = (
    <>
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-line)]">
        <img
          src={placeholder(work.id)}
          alt={work.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />

        {work.category === "Exhibition" && (
          <span className="absolute left-3 top-3 bg-black/70 px-2 py-1 text-[10px] tracking-wider-jp text-white">
            Exhibition
          </span>
        )}

        {/* ポップアップ（概要説明） */}
        <div
          className={`absolute inset-0 flex flex-col justify-end bg-black/55 p-4 text-white transition-opacity duration-500 group-hover:opacity-100 md:opacity-0 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="max-h-full overflow-y-auto">
            <p className="text-[10px] tracking-wider-jp opacity-80">
              {work.year}
              {work.series ? ` ・ ${work.series}` : ""}
            </p>
            <p className="mt-1 text-sm tracking-wider-jp">{work.title}</p>
            <p className="mt-2 text-[11px] leading-relaxed opacity-90 line-clamp-4">
              {work.description}
            </p>
            <div className="mt-3 flex gap-4 text-[11px] tracking-wider-jp">
              {work.hasDetail ? (
                <span className="underline underline-offset-4">詳細を見る →</span>
              ) : (
                <a
                  href={work.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="underline underline-offset-4"
                >
                  Instagram →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <p className="text-xs tracking-wider-jp">{work.title}</p>
        <p className="mt-0.5 text-[10px] text-[var(--color-muted)]">
          {work.year}
          {work.material ? ` / ${work.material}` : ""}
        </p>
      </div>
    </>
  );

  if (work.hasDetail) {
    return (
      <Link href={`/works/${work.id}`} className="group block">
        {inner}
      </Link>
    );
  }

  return (
    <div
      className="group block cursor-pointer"
      onClick={() => setOpen((v) => !v)}
      onMouseLeave={() => setOpen(false)}
    >
      {inner}
    </div>
  );
}

export default function WorksGrid({ works, years, comingSoonYear }) {
  return (
    <div className="space-y-24">
      {years.map((year) => {
        const items = works.filter((w) => w.year === year);
        return (
          <section key={year}>
            <div className="mb-8 flex items-baseline gap-4">
              <h2 className="text-2xl font-light tracking-wider-jp">{year}</h2>
              <span className="text-[10px] tracking-wider-jp text-[var(--color-muted)]">
                {items.length} works
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3">
              {items.map((work) => (
                <Card key={work.id} work={work} />
              ))}
            </div>
          </section>
        );
      })}

      {/* Coming Soon（仕様書 9.3） */}
      <section>
        <div className="mb-8 flex items-baseline gap-4">
          <h2 className="text-2xl font-light tracking-wider-jp">
            {comingSoonYear}
          </h2>
        </div>
        <div className="flex aspect-[3/1] w-full items-center justify-center border border-dashed border-[var(--color-line)]">
          <p className="text-sm tracking-wider-jp text-[var(--color-muted)]">
            Coming Soon
          </p>
        </div>
      </section>
    </div>
  );
}
