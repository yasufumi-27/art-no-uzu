import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { placeholder } from "@/lib/placeholder";
import { detailWorks } from "@/lib/works";

export default function Home() {
  const featured = detailWorks().slice(0, 3);

  return (
    <>
      <Hero />

      <div className="container-main">
        {/* ステートメント（間・余白） */}
        <Reveal className="py-28 md:py-40 max-w-2xl mx-auto text-center">
          <p className="text-sm md:text-base leading-loose tracking-wider-jp text-[var(--color-ink)]">
            静けさの中に、緊張が宿る。
            <br />
            余白と間（ま）を通して、作品そのものと向き合う。
          </p>
        </Reveal>

        {/* Featured Works */}
        <section className="pb-10">
          <Reveal className="mb-12 flex items-baseline justify-between">
            <h2 className="text-lg tracking-wider-jp">Selected Works</h2>
            <Link
              href="/works"
              className="text-xs tracking-wider-jp text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            >
              View all →
            </Link>
          </Reveal>
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-3">
            {featured.map((work, i) => (
              <Reveal key={work.id} delay={i * 0.1}>
                <Link href={`/works/${work.id}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-line)]">
                    <img
                      src={placeholder(work.id)}
                      alt={work.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-3 text-xs tracking-wider-jp">{work.title}</p>
                  <p className="mt-0.5 text-[10px] text-[var(--color-muted)]">
                    {work.year}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
