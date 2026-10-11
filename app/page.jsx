import Link from "next/link";
import Hero from "@/components/Hero";
import LifeLine from "@/components/LifeLine";
import Reveal from "@/components/Reveal";
import ScrollStatement from "@/components/ScrollStatement";
import FadeImg from "@/components/FadeImg";
import { asset } from "@/lib/asset";
import FeaturedWorks from "@/components/FeaturedWorks";
import { SOCIAL } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <LifeLine />
      <ScrollStatement />

      <div className="container-main">
        {/* Works / Exhibition */}
        <section className="pb-10">
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
          <FeaturedWorks />
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
              <p className="mt-8 text-sm leading-loose">
                神谷佳美（YOSHIMI KAMITANI）。1994年東京生まれ。
                2015年から、「渦」を描き続けている。
              </p>
              <p className="mt-4 text-sm leading-loose text-[var(--color-muted)]">
                目指すのは、「渦を80年描き続けた、100歳のおばあちゃん」になること。
                毎年「渦とは何か」を問い直し、その年の探究を作品として残している。
              </p>
              <Link
                href="/about"
                className="nav-link mt-8 inline-block text-xs tracking-wider-jp"
              >
                More about the artist →
              </Link>
            </Reveal>
          </div>
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
