import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import Reveal from "@/components/Reveal";
import { placeholder } from "@/lib/placeholder";
import {
  comingSoonYear,
  detailWorks,
  getWork,
  works,
  years,
} from "@/lib/works";

// 静的エクスポート用：専用詳細ページを持つ作品（5件）のパスを生成。
export function generateStaticParams() {
  return detailWorks().map((w) => ({ id: w.id }));
}

export function generateMetadata({ params }) {
  const work = getWork(params.id);
  if (!work) return {};
  return {
    title: work.title,
    description: work.description,
  };
}

export default function WorkDetail({ params }) {
  const work = getWork(params.id);
  if (!work || !work.hasDetail) notFound();

  const info = [
    ["Title", work.title],
    ["Year", work.year],
    ["Category", work.category],
    ["Series", work.series],
    ["Material", work.material],
    ["Size", work.size],
  ].filter(([, v]) => v);

  // 同年の他作品（自身を除く）
  const related = works.filter(
    (w) => w.year === work.year && w.id !== work.id
  );

  return (
    <div className="py-14 md:py-20">
      <div className="container-main">
        <Link
          href="/works"
          className="text-xs tracking-wider-jp text-[var(--color-muted)] hover:text-[var(--color-ink)]"
        >
          ← Works / Exhibition
        </Link>
      </div>

      {/* 作品を大きく上部表示 */}
      <Reveal className="container-wide mt-10">
        <Gallery id={work.id} count={work.gallery ?? 3} />
      </Reveal>

      {/* 作品画像の下に説明文など */}
      <div className="container-main mt-14 grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr]">
        <Reveal delay={0.1}>
          {work.category === "Exhibition" && (
            <span className="inline-block bg-black px-2 py-1 text-[10px] tracking-wider-jp text-white">
              Exhibition
            </span>
          )}
          <h1 className="mt-4 text-2xl font-light tracking-wider-jp md:text-3xl leading-relaxed">
            {work.title}
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-loose text-[var(--color-ink)]">
            {work.description}
          </p>
          <a
            href={work.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block border-b border-[var(--color-ink)] pb-1 text-xs tracking-wider-jp hover:opacity-60"
          >
            Instagram で見る →
          </a>
        </Reveal>

        <Reveal
          as="dl"
          delay={0.2}
          className="space-y-3 border-t border-[var(--color-line)] pt-8 text-xs md:border-l md:border-t-0 md:pl-10 md:pt-0"
        >
          {info.map(([k, v]) => (
            <div key={k} className="flex gap-6">
              <dt className="w-24 shrink-0 tracking-wider-jp text-[var(--color-muted)]">
                {k}
              </dt>
              <dd className="tracking-wider-jp">{v}</dd>
            </div>
          ))}
        </Reveal>
      </div>

      {/* フッター上：同年の他作品を横1列 */}
      {related.length > 0 && (
        <Reveal className="container-main mt-28">
          <h2 className="mb-8 text-sm tracking-wider-jp text-[var(--color-muted)]">
            {work.year} の他の作品
          </h2>
          <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-2">
            {related.map((w) => (
              <Link
                key={w.id}
                href={w.hasDetail ? `/works/${w.id}` : `/works/?year=${w.year}`}
                className="group block w-40 shrink-0 sm:w-48"
              >
                <div className="relative aspect-square overflow-hidden bg-[var(--color-line)]">
                  <img
                    src={placeholder(w.id, 1)}
                    alt={w.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.1]"
                  />
                  {w.category === "Exhibition" && (
                    <span className="absolute left-2 top-2 bg-black/70 px-1.5 py-0.5 text-[9px] tracking-wider-jp text-white">
                      Exhibition
                    </span>
                  )}
                </div>
                <p className="mt-2 text-[11px] tracking-wider-jp">{w.title}</p>
              </Link>
            ))}
          </div>
        </Reveal>
      )}

      {/* 年号一覧：選択するとその年の Works 一覧へ（#6） */}
      <Reveal className="container-main mt-24">
        <h2 className="mb-6 font-display text-sm tracking-[0.2em] text-[var(--color-muted)]">
          Browse by Year
        </h2>
        <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-[var(--color-line)] pt-6 text-sm tracking-wider-jp">
          {[comingSoonYear, ...years].map((year) => (
            <Link
              key={year}
              href={`/works/?year=${year}`}
              className={`nav-link underline-offset-4 transition-colors hover:text-[var(--color-ink)] ${
                year === work.year
                  ? "font-medium text-[var(--color-ink)]"
                  : "text-[var(--color-muted)]"
              }`}
            >
              {year}
            </Link>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
