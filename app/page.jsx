import Link from "next/link";
import Hero from "@/components/Hero";
import HistoryTimeline from "@/components/HistoryTimeline";
import { HISTORY } from "@/lib/history";
import LifeLine from "@/components/LifeLine";
import Reveal from "@/components/Reveal";
import FadeImg from "@/components/FadeImg";
import { asset } from "@/lib/asset";
import FeaturedWorks from "@/components/FeaturedWorks";
import PoetryInterlude from "@/components/PoetryInterlude";
import { WORK_DETAILS } from "@/lib/work-details";
import { SOCIAL } from "@/components/Footer";

// A complete short poem, retaining the same line breaks as the work page.
const POEMS = Object.entries(WORK_DETAILS)
  .filter(([, work]) => work.purchaseUrl && work.description &&
    work.description.split("\n").filter(Boolean).length <= 10)
  .map(([id, work]) => ({ id, title: work.title, text: work.description }));

export default function Home() {
  return (
    <>
      <Hero />
      <LifeLine />
      <PoetryInterlude poems={POEMS} />

      <div className="container-main">
        {/* Works / Exhibition */}
        <section className="pb-10">
          <FeaturedWorks>
          <Reveal className="mb-12 flex items-baseline justify-between gap-4">
            <h2 className="font-display text-2xl tracking-[0.12em] sm:text-4xl sm:tracking-[0.15em]">
              Works / Exhibition
            </h2>
            <Link
              href="/works"
              className="nav-link whitespace-nowrap text-xs tracking-wider-jp text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            >
              View all →
            </Link>
          </Reveal>
          </FeaturedWorks>
        </section>

        {/* About */}
        <section className="border-t border-[var(--color-line)] py-24 md:py-32">
          <div className="grid grid-cols-1 gap-14 md:grid-cols-[1fr_1.3fr] md:items-center">
            <Reveal>
              <div className="aspect-[4/5] w-full overflow-hidden bg-[var(--color-line)]">
                <FadeImg
                  src={asset("/images/about/artist.webp")}
                  alt="神谷佳美"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-2xl tracking-[0.12em] sm:text-4xl sm:tracking-[0.15em]">About</h2>
              <div className="mt-8 space-y-6 text-sm leading-loose">
                <p>神谷佳美（YOSHIMI KAMITANI）</p>
                <p>1994年東京生まれ。<br />2015年から「渦」だけを描き続けている。</p>
                <p>渦を通して、人間の悩みや願望、そして自分の人生を生きる決意を描く。</p>
                <p>芸術の完成形として思い描くのは、「渦を80年描き続けた、100歳のおばあちゃん」になった自分自身。</p>
                <p>一枚一枚の作品だけでなく、渦を描き続ける人生そのものを、ひとつの作品として構想している。</p>
              </div>
              <Link
                href="/about"
                className="nav-link mt-8 inline-block text-xs tracking-wider-jp"
              >
                More about the artist →
              </Link>
            </Reveal>
          </div>
        </section>

        {/* History */}
        <section className="border-t border-[var(--color-line)] py-24 md:py-32" aria-labelledby="home-history">
          <Reveal>
            <div className="flex items-baseline justify-between gap-4 border-b border-[var(--color-line)] pb-4">
              <h2 id="home-history" className="font-display text-2xl tracking-[0.12em] sm:text-4xl sm:tracking-[0.15em]">HISTORY</h2>
              <Link href="/about#history" className="nav-link whitespace-nowrap text-xs tracking-wider-jp text-[var(--color-muted)] hover:text-[var(--color-ink)]">View all →</Link>
            </div>
            <HistoryTimeline history={HISTORY} />
          </Reveal>
        </section>

        {/* Contact */}
        <section className="border-t border-[var(--color-line)] py-24 md:py-32 text-center">
          <Reveal>
            <h2 className="font-display text-2xl tracking-[0.12em] sm:text-4xl sm:tracking-[0.15em]">Contact</h2>
            <p className="mt-6 text-sm leading-loose text-[var(--color-muted)]">
              作品のご購入・ご依頼・お問い合わせは、
              <br className="md:hidden" />
              フォームまたは各SNSよりお気軽にご連絡ください。
            </p>
            <ul className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs tracking-wider-jp text-[var(--color-muted)]">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link hover:text-[var(--color-ink)]"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-12 inline-block border border-[var(--color-ink)] px-12 py-3 text-xs tracking-wider-jp transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)]"
            >
              お問い合わせフォームへ
            </Link>
          </Reveal>
        </section>
      </div>
    </>
  );
}
