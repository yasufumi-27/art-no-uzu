import Reveal from "@/components/Reveal";
import HistoryTimeline from "@/components/HistoryTimeline";
import { HISTORY } from "@/lib/history";
import StatementInk from "@/components/StatementInk";
import Spiral from "@/components/Spiral";
import FadeImg from "@/components/FadeImg";
import { asset } from "@/lib/asset";
import { SITE_URL, ARTIST_ID } from "@/lib/site";

export const metadata = {
  title: "About",
  description:
    "神谷佳美（YOSHIMI KAMITANI）。1994年東京生まれ。2015年から渦を描き続けるアーティストのプロフィール・ステートメント・活動歴。",
  alternates: { canonical: `${SITE_URL}/about/` },
  openGraph: {
    url: `${SITE_URL}/about/`,
    locale: "ja_JP",
    siteName: "ART NO UZU",
    type: "website",
    title: "About — ART NO UZU",
    description:
      "神谷佳美（YOSHIMI KAMITANI）。1994年東京生まれ。2015年から渦を描き続けるアーティストのプロフィール・ステートメント・活動歴。",
  },
};

// 2026-10-19 LINE受領原稿。段落・改行を保持。
const STATEMENT = [
  [
    "渦は、同じ場所を巡っているように見えながら、少しずつ位置を変え、同じ地点には二度と戻らない。"
  ],
  [
    "私の人生もまた、同じ悩みに何度も出会いながら、その度に状況は変わり、そこに向き合う自分も同じではない。"
  ],
  [
    "私が変われば、渦も変わる。",
    "生きる時代が変われば、問いも変わる。",
    "だから、同じ渦を描いても、同じ渦にはならない。"
  ],
  [
    "私は、そんな人生の悩みや願望、そして自分の人生を生きる決意を、渦に重ねてきた。"
  ],
  [
    "私が渦を通して問い続けたいのは、"
  ],
  [
    "「人は、自らの決意によって、どれだけ自分の人生に矜持を持って生きられるのか？」ということ。"
  ],
  [
    "そして、私が芸術の完成形として思い描くのは、「渦を80年描き続けた、100歳のおばあちゃん」になった自分自身である。"
  ],
  [
    "毎年「渦とは何か」「なぜ私は渦を描き続けるのか」を問い続け、その年の探究を作品として残す。"
  ],
  [
    "同時に、その年の渦を自らの顔と身体に描き、言葉と写真とともに、一年ずつ記録していく。"
  ],
  [
    "一人の人間が、生涯ひとつの形を描き続けたとき、何が変わり、何が最後まで残るのか。"
  ],
  [
    "80年分の渦を並べたとき、そこに私が何を選び、どう生き、どう変わり、それでも何を手放さなかったのかが残っていてほしい。"
  ],
  [
    "渦を描き続けること自体が、自分の決意を生きる実践でもある。"
  ],
  [
    "一枚一枚の作品だけでなく、渦を描き続けた人生そのものを、ひとつの作品として完成させていきたい。"
  ]
];

export default function AboutPage() {
  return (
    <div className="container-main py-20 md:py-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/about/#profile`,
        url: `${SITE_URL}/about/`,
        name: "神谷佳美（YOSHIMI KAMITANI）プロフィール",
        inLanguage: "ja",
        mainEntity: { "@id": ARTIST_ID },
        isPartOf: { "@id": `${SITE_URL}/#website` },
        citation: [...new Set(HISTORY.flatMap(year => [...year.items, ...(year.exhibitions || [])].flatMap(item => (item.links || []).map(link => link.href))))],
      }).replace(/</g, "\\u003c") }} />
      <div className="grid grid-cols-1 gap-16 md:grid-cols-[1fr_1.2fr]">
        <Reveal className="md:sticky md:top-28 md:self-start">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-line)]">
            <FadeImg
              src={asset("/images/about/artist.webp")}
              alt="神谷佳美 ポートレート"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="font-display text-xs tracking-[0.3em] text-[var(--color-muted)]">
              渦を12年描いてる人
            </p>
            <h1 className="mt-4 font-display text-3xl font-light tracking-[0.08em]">
              神谷佳美
            </h1>
            <p className="mt-1 text-xs tracking-[0.2em] text-[var(--color-muted)]">
              Yoshimi Kamitani
            </p>
            <p className="mt-8 text-sm leading-loose">
              1994年東京生まれ。
              <br />
              2015年から「渦」だけを描き続けている。
            </p>
          </Reveal>

          <Reveal className="mt-14">
            <div className="mb-4 flex items-center gap-4">
              <span className="h-8 w-8 text-[var(--color-muted)]">
                <Spiral className="spin-slow h-full w-full" />
              </span>
              <h2 className="font-display text-sm tracking-[0.2em] text-[var(--color-muted)]">
                STATEMENT
              </h2>
            </div>
            <StatementInk
              paragraphs={STATEMENT}
              emphasis="「渦を80年描き続けた、100歳のおばあちゃん」"
            />
          </Reveal>

        </div>
      </div>

      {/* History：年のタイムラインで選んだ年だけを表示（項目が増えても縦に伸びない） */}
      <Reveal className="mt-24 md:mt-32">
        <div className="flex items-baseline justify-between border-b border-[var(--color-line)] pb-4">
          <h2 id="history" className="scroll-mt-28 font-display text-sm tracking-[0.2em] text-[var(--color-muted)]">
            HISTORY
          </h2>
          <p className="text-[0.625rem] tracking-[0.2em] text-[var(--color-muted)]">
            {HISTORY[HISTORY.length - 1].year} — {HISTORY[0].year}
          </p>
        </div>
        <HistoryTimeline history={HISTORY} />
      </Reveal>

      {/* 2026-10-13の来歴PDFと照合した全文。年を選ばず一覧で読める。 */}
      <section className="mt-16 sm:mt-24 md:mt-32" aria-labelledby="biography-heading">
        <div className="flex items-baseline justify-between gap-6 border-b border-[var(--color-line)] pb-4">
          <h2 id="biography-heading" className="text-sm tracking-[0.2em]">来歴</h2>
        </div>
        <div className="divide-y divide-[var(--color-line)]">
          {[...HISTORY].reverse().filter(({ items, exhibitions }) => items.length > 0 || exhibitions?.length > 0).map(({ year, items, exhibitions }) => (
            <section key={year} aria-labelledby={`biography-${year}`} className="grid grid-cols-[44px_minmax(0,1fr)] gap-3 py-4 sm:grid-cols-[100px_1fr] sm:gap-8 sm:py-8">
              <h3 id={`biography-${year}`} className="font-display pt-0.5 text-[13px] tracking-[0.08em] sm:pt-0 sm:text-lg sm:tracking-[0.15em]">{year}</h3>
              <div className="text-xs leading-[1.85] tracking-[0.02em] sm:text-sm sm:leading-loose sm:tracking-normal">
                {items.length > 0 && <ul className="space-y-1">{items.map(item => <li key={item.text}>{item.text}</li>)}</ul>}
                {exhibitions?.length > 0 && <div className={items.length ? "mt-3 sm:mt-5" : ""}>
                  <p className="mb-1 text-[10px] tracking-[0.12em] text-[var(--color-muted)] sm:text-xs">EXHIBITION</p>
                  <ul className="space-y-1">{exhibitions.map(item => <li key={item.text}>{item.text}</li>)}</ul>
                </div>}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
