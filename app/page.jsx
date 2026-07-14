import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import Spiral from "@/components/Spiral";
import FadeImg from "@/components/FadeImg";
import { placeholder } from "@/lib/placeholder";
import FeaturedWorks from "@/components/FeaturedWorks";
import { SOCIAL } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />

      <div className="container-main">
        {/* ステートメント：渦のコンセプト */}
        <Reveal className="relative py-32 md:py-44 max-w-2xl mx-auto text-center">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 text-[var(--color-line)] breathe">
            <Spiral className="spin-slow h-full w-full" />
          </div>
          <p className="font-display text-xs tracking-[0.3em] text-[var(--color-muted)]">
            ART NO UZU
          </p>
          <p className="mt-8 text-base md:text-lg leading-loose tracking-wider-jp">
            渦は、感情であり、呼吸であり、
            <br />
            記録であり、祈り。
          </p>
          <p className="mt-8 text-xs leading-loose text-[var(--color-muted)]">
            2014年から、ただひたすらに渦を描き続けている。
            <br />
            一筆ずつ重ねた反復が、生きた時間そのものになる。
          </p>
        </Reveal>

        {/* Works / Exhibition */}
        <section className="pb-10">
          <Reveal className="mb-12 flex items-baseline justify-between">
            <h2 className="font-display text-4xl tracking-[0.15em]">
              Works / Exhibition
            </h2>
            <Link
              href="/works"
              className="nav-link text-xs tracking-wider-jp text-[var(--color-muted)] hover:text-[var(--color-ink)]"
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
                  src={placeholder("about-portrait", 4 / 5)}
                  alt="神谷佳美"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl tracking-[0.15em]">About</h2>
              <p className="mt-8 text-sm leading-loose">
                神谷佳美（Kamitani Yoshimi）。1994年東京生まれ。
                2014年より「渦」だけを描き続けている。
                目指すのは、80年間渦を描き続けた100歳のおばあちゃんになること。
              </p>
              <p className="mt-4 text-sm leading-loose text-[var(--color-muted)]">
                飾るための絵は描いていない。歳を重ねるごとに深まり、
                その人らしく生きる生涯に寄り添う——そんな一枚を渦に託している。
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
            <h2 className="font-display text-4xl tracking-[0.15em]">Contact</h2>
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
