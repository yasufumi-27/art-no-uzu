import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import Reveal from "@/components/Reveal";
import FadeImg from "@/components/FadeImg";
import InstagramBadge from "@/components/InstagramBadge";
import {
  comingSoonYear,
  detailWorks,
  getWork,
  works,
  workAlt,
  years,
} from "@/lib/works";
import { SITE_URL, ARTIST_ID } from "@/lib/site";

// Describe only known artwork facts. A year alone is not a valid event start date;
// exhibition pages describe an archive record until precise event data is supplied.
function workTitle(work) {
  return work.title || `${work.year} — ${work.category} ${work.id.split("_")[1]}`;
}
function workDescription(work) {
  return work.description || `神谷佳美（YOSHIMI KAMITANI）の${work.year}年の${work.category === "Exhibition" ? "展示記録" : "作品"}「${workTitle(work)}」。作品画像と関連リンクを掲載。`;
}
function workJsonLd(work) {
  const url = `${SITE_URL}/works/${work.id}/`;
  return {
    "@context": "https://schema.org",
    "@type": work.category === "Exhibition" ? "CreativeWork" : "VisualArtwork",
    "@id": `${url}#work`,
    name: workTitle(work),
    ...(work.category === "Exhibition" ? {} : {
      dateCreated: String(work.year),
      artform: "絵画",
      artMedium: work.material ?? undefined,
    }),
    description: workDescription(work),
    url,
    mainEntityOfPage: url,
    image: work.images.map(src => new URL(src, SITE_URL).href),
    creator: { "@id": ARTIST_ID },
    copyrightHolder: { "@id": ARTIST_ID },
  };
}

// 静的エクスポート用：専用詳細ページを持つ作品・展示のパスを生成。
export function generateStaticParams() {
  return detailWorks().map((w) => ({ id: w.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const work = getWork(id);
  if (!work) return {};
  return {
    title: workTitle(work),
    description: workDescription(work),
    alternates: { canonical: `${SITE_URL}/works/${work.id}/` },
    // OGP はルートの openGraph.title を継承しないため、ページ別に明示する（仕様書 17）
    openGraph: {
      title: `${workTitle(work)} — ART NO UZU`,
      url: `${SITE_URL}/works/${work.id}/`,
      locale: "ja_JP",
      siteName: "ART NO UZU",
      type: "website",
      images: work.images.map(src => ({ url: new URL(src, SITE_URL).href, alt: workTitle(work) })),
      description: workDescription(work),
    },
  };
}

export default async function WorkDetail({ params }) {
  const { id } = await params;
  const work = getWork(id);
  if (!work || !work.hasDetail) notFound();

  const info = [
    ["Title", work.title],
    ["Year", work.year],
    ["Category", work.category],
    ["Period", work.period],
    ["Venue", work.venue],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workJsonLd(work)) }}
      />
      <div className="container-wide">
        <Link
          href="/works"
          className="inline-block text-xs tracking-wider-jp text-[var(--color-muted)] hover:text-[var(--color-ink)]"
        >
          ← Works / Exhibition
        </Link>
      </div>

      {/* 作品を大きく上部表示 */}
      <Reveal className="container-wide mt-10">
        <Gallery images={work.images} alt={workAlt(work)} />
      </Reveal>

      {/* 作品画像の下に説明文など */}
      <div className="container-main mt-14 grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr]">
        <Reveal delay={0.1}>
          {work.category === "Exhibition" && (
            <span className="inline-block bg-black px-2 py-1 text-[0.625rem] tracking-wider-jp text-white">
              Exhibition
            </span>
          )}
          <h1 className="mt-4 text-2xl font-light tracking-wider-jp md:text-3xl leading-relaxed">
            {work.title || `${work.year} — ${work.category} ${work.id.split("_")[1]}`}
          </h1>
          <p className="mt-6 max-w-xl whitespace-pre-line text-sm leading-loose text-[var(--color-ink)]">
            {work.description}
          </p>
          {work.poem && <div className="mt-10 border-t border-[var(--color-line)] pt-8">
            <h2 className="text-xs tracking-wider-jp text-[var(--color-muted)]">詩</h2>
            <p className="mt-5 whitespace-pre-line text-sm leading-loose">{work.poem}</p>
          </div>}
          {work.article && <a href={work.article} target="_blank" rel="noopener noreferrer" className="mt-8 block text-xs underline underline-offset-4">展示について読む ↗</a>}
          {work.purchaseUrl && <a href={work.purchaseUrl} target="_blank" rel="noopener noreferrer" className="mt-8 block w-fit border border-[var(--color-ink)] px-6 py-3 text-xs tracking-wider-jp hover:bg-[var(--color-ink)] hover:text-white">BASEで作品を見る ↗</a>}
          <a
            href={work.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block border-b border-[var(--color-ink)] pb-1 text-xs tracking-wider-jp hover:opacity-60"
          >
            {work.linkLabel} で見る →
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
          <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pt-4 pb-6">
            {related.map((w) => {
              const inner = (
                <>
                  <div className="zoom-card relative aspect-square overflow-hidden bg-[var(--color-line)]">
                    <FadeImg
                      src={w.thumb}
                      sizes="(min-width: 640px) 192px, 160px"
                      alt={workAlt(w)}
                      className="h-full w-full object-cover"
                    />
                    {w.category === "Exhibition" && (
                      <span className="absolute left-2 top-2 bg-black/70 px-1.5 py-0.5 text-[0.5625rem] tracking-wider-jp text-white">
                        Exhibition
                      </span>
                    )}
                    {!w.hasDetail && <InstagramBadge label={w.linkLabel} small />}
                  </div>
                  <p className="mt-2 text-[0.6875rem] tracking-wider-jp">{w.title}</p>
                </>
              );
              // 詳細ページあり→詳細へ、なし→直接 Instagram へ（#1）
              return w.hasDetail ? (
                <Link
                  key={w.id}
                  href={`/works/${w.id}`}
                  className="group block w-40 shrink-0 sm:w-48"
                >
                  {inner}
                </Link>
              ) : (
                <a
                  key={w.id}
                  href={w.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block w-40 shrink-0 sm:w-48"
                >
                  {inner}
                </a>
              );
            })}
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
