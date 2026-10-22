import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import BookSpread from "@/components/BookSpread";
import BookVertical from "@/components/BookVertical";
import Reveal from "@/components/Reveal";
import FadeImg from "@/components/FadeImg";
import InstagramBadge from "@/components/InstagramBadge";
import {
  WORK_REDIRECTS,
  comingSoonYear,
  detailWorks,
  getWork,
  works,
  workAlt,
  years,
} from "@/lib/works";
import { asset } from "@/lib/asset";
import { SITE_URL, ARTIST_ID } from "@/lib/site";

// Describe only known artwork facts. A year alone is not a valid event start date;
// exhibition pages describe an archive record until precise event data is supplied.
function workTitle(work) {
  return work.title || `${work.year} — ${work.category} ${work.id.split("_")[1]}`;
}
function workDescription(work) {
  return work.description || `神谷佳美（YOSHIMI KAMITANI）の${work.year}年の${work.category === "Exhibition" ? "展示記録" : work.category === "Essay" ? "エッセイ" : "作品"}「${workTitle(work)}」。作品画像と関連リンクを掲載。`;
}
function workJsonLd(work) {
  const url = `${SITE_URL}/works/${work.id}/`;
  return {
    "@context": "https://schema.org",
    "@type": ["Exhibition", "Essay"].includes(work.category) ? "CreativeWork" : "VisualArtwork",
    "@id": `${url}#work`,
    name: workTitle(work),
    ...(work.englishTitle ? { alternateName: work.englishTitle } : {}),
    ...(["Exhibition", "Essay"].includes(work.category) ? {} : {
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
  return [...detailWorks().map((w) => ({ id: w.id })), ...Object.keys(WORK_REDIRECTS).map(id => ({ id }))];
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
  if (id !== work.id) {
    const target = asset(`/works/${work.id}/`);
    return <>
      <meta httpEquiv="refresh" content={`0;url=${target}`} />
      <div className="container-main py-20"><Link href={`/works/${work.id}/`}>{work.title} の詳細ページへ →</Link></div>
    </>;
  }

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
          href={`/works/?year=${work.year}`}
          className="inline-block text-xs tracking-wider-jp text-[var(--color-muted)] hover:text-[var(--color-ink)]"
        >
          ← Works / Exhibition
        </Link>
      </div>

      {/* 作品を大きく上部表示 */}
      <Reveal className="container-wide work-gallery-shell mt-10">
        <Gallery images={work.images} alt={workAlt(work)} />
      </Reveal>

      {/* 作品画像の下に説明文など */}
      <div className="container-main mt-14 grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr]">
        <Reveal delay={0.1}>
          {work.category !== "Works" && (
            <span className="inline-block bg-black px-2 py-1 text-[0.625rem] tracking-wider-jp text-white">
              {work.category}
            </span>
          )}
          <h1 className="mt-4 whitespace-pre-line text-2xl font-light tracking-wider-jp md:text-3xl leading-relaxed">
            {work.title || `${work.year} — ${work.category} ${work.id.split("_")[1]}`}
          </h1>
          {work.englishTitle && <p lang="en" className="mt-4 text-sm leading-relaxed tracking-wide text-[var(--color-muted)]">{work.englishTitle}</p>}
          <p className="mt-6 max-w-xl whitespace-pre-line text-sm leading-loose text-[var(--color-ink)]">
            {work.description}
          </p>
          {work.awardUrl && <a href={work.awardUrl} target="_blank" rel="noopener noreferrer" className="mt-4 block text-xs underline underline-offset-4">GOOD DESIGN AWARD 公式ページ ↗</a>}
          {work.poem && <div className="mt-10 border-t border-[var(--color-line)] pt-8">
            <h2 className="text-xs tracking-wider-jp text-[var(--color-muted)]">詩</h2>
            <p className="mt-5 whitespace-pre-line text-sm leading-loose">{work.poem}</p>
          </div>}
          {work.essayUrl && <a href={work.essayUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block border-b border-[var(--color-ink)] pb-1 text-xs tracking-wider-jp hover:opacity-60">エッセイを読む ↗</a>}
          {work.article && <a href={work.article} target="_blank" rel="noopener noreferrer" className="mt-8 block text-xs underline underline-offset-4">{work.articleLabel || "展示について読む"} ↗</a>}
          {work.purchaseUrl && <a href={work.purchaseUrl} target="_blank" rel="noopener noreferrer" className="mt-8 block w-fit border border-[var(--color-ink)] px-6 py-3 text-xs tracking-wider-jp hover:bg-[var(--color-ink)] hover:text-white">BASEで作品を見る ↗</a>}
          {work.websiteUrl && <a href={work.websiteUrl} target="_blank" rel="noopener noreferrer" className="mt-8 block w-fit break-all text-xs underline underline-offset-4 hover:opacity-60">{work.websiteUrl} ↗</a>}
          {work.category !== "Essay" && !work.websiteUrl && <a
            href={work.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block border-b border-[var(--color-ink)] pb-1 text-xs tracking-wider-jp hover:opacity-60"
          >
            {work.linkLabel} で見る →
          </a>}
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

      {work.bookUrl && <section className="container-main mt-20 md:mt-28" aria-labelledby="work-book-title">
        <h2 id="work-book-title" className="border-b border-[var(--color-line)] pb-5 text-sm tracking-wider-jp">作品集 — {work.bookTitle}</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-[160px_1fr] md:items-start">
          <a href={work.bookUrl} target="_blank" rel="noopener noreferrer" className="mx-auto block w-32 md:w-full" aria-label={`作品集「${work.bookTitle}」を開く`}>
            <FadeImg src={work.bookImage} alt={`作品集「${work.bookTitle}」表紙`} className="h-auto w-full" />
          </a>
          <div>
            {work.bookLayout === "vertical" ? <BookVertical bookUrl={work.bookUrl} directory={work.bookImageDirectory} pageCount={work.bookPageCount} title={work.bookTitle} /> : work.bookImageDirectory ? <BookSpread bookUrl={work.bookUrl} directory={work.bookImageDirectory} pageCount={work.bookPageCount} title={work.bookTitle} /> : <iframe src={work.bookUrl} title={`作品集「${work.bookTitle}」`} loading="lazy" allowFullScreen className="aspect-[3/4] w-full border-0 md:aspect-[4/3]" />}
            <a href={work.bookUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-xs underline underline-offset-4">作品集を別画面で読む ↗</a>
          </div>
        </div>
      </section>}

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
                    {w.category !== "Works" && (
                      <span className="absolute left-2 top-2 bg-black/70 px-1.5 py-0.5 text-[0.5625rem] tracking-wider-jp text-white">
                        {w.category}
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
