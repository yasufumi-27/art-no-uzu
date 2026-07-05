import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import { detailWorks, getWork } from "@/lib/works";

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

  return (
    <div className="container-main py-16 md:py-24">
      <Link
        href="/works"
        className="text-xs tracking-wider-jp text-[var(--color-muted)] hover:text-[var(--color-ink)]"
      >
        ← Works / Exhibition
      </Link>

      <div className="mt-10 grid grid-cols-1 gap-14 md:grid-cols-[1.5fr_1fr]">
        <Gallery id={work.id} count={work.gallery ?? 3} />

        <div className="md:pt-4">
          {work.category === "Exhibition" && (
            <span className="inline-block bg-black px-2 py-1 text-[10px] tracking-wider-jp text-white">
              Exhibition
            </span>
          )}
          <h1 className="mt-4 text-2xl font-light tracking-wider-jp">
            {work.title}
          </h1>
          <p className="mt-6 text-sm leading-loose text-[var(--color-ink)]">
            {work.description}
          </p>

          <dl className="mt-10 space-y-3 border-t border-[var(--color-line)] pt-8 text-xs">
            {info.map(([k, v]) => (
              <div key={k} className="flex gap-6">
                <dt className="w-24 shrink-0 tracking-wider-jp text-[var(--color-muted)]">
                  {k}
                </dt>
                <dd className="tracking-wider-jp">{v}</dd>
              </div>
            ))}
          </dl>

          <a
            href={work.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block border-b border-[var(--color-ink)] pb-1 text-xs tracking-wider-jp hover:opacity-60"
          >
            Instagram で見る →
          </a>
        </div>
      </div>
    </div>
  );
}
