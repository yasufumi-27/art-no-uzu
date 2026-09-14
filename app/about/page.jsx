import Reveal from "@/components/Reveal";
import HistoryYear from "@/components/HistoryYear";
import Spiral from "@/components/Spiral";
import FadeImg from "@/components/FadeImg";
import { asset } from "@/lib/asset";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "About",
  description:
    "神谷佳美（YOSHIMI KAMITANI）。1994年東京生まれ。2015年から渦を描き続けるアーティストのプロフィール・ステートメント・活動歴。",
  alternates: { canonical: `${SITE_URL}/about/` },
  openGraph: {
    title: "About — ART NO UZU",
    description:
      "神谷佳美（YOSHIMI KAMITANI）。1994年東京生まれ。2015年から渦を描き続けるアーティストのプロフィール・ステートメント・活動歴。",
  },
};

// 活動歴（2026-09 クライアント提供の確定リスト）。
// exhibitions は原稿の「●EXHIBITION」以下の項目。
const HISTORY = [
  { year: "2026", items: [
    "南種子島ふるさと納税返礼品・ひいらぎ 銀座本店 抹茶マカロン パッケージデザイン（Shinfula）",
    "曙酒造 domaine dawn ワインパッケージデザイン",
  ] },
  { year: "2025", items: [
    "展示「渦に沈む」",
    { text: "「アートゴールデン街」（GOOD DESIGN賞受賞）（NoxGallery × Superchief × Brillia）Yahoo!ニュース掲載", href: "https://www.g-mark.org/gallery/winners/30972" },
    "SEKAI NO OWARI「図鑑」リリース記念ショートムービー制作",
  ], exhibitions: ["concent shibuya（渋谷）個展「生まれた喜び」"] },
  { year: "2023", items: [
    "PSG（パリ・サンジェルマンFC）コラボ",
    "NIKE エアフォース1 広告出演",
    "第8回インフルエンサー・アワード・ジャパン2023 ENTERTAINMENT部門 最優秀賞",
  ] },
  { year: "2022", items: ["劇団アレン舞台「いい人間の教科書」衣装提供（カンゲキ大賞受賞）"] },
  { year: "2021", items: ["白石聖 写真展「COLOR」衣装提供"] },
  { year: "2020", items: ["劇団アレン舞台「シカク」衣装提供"] },
  { year: "2019", items: [
    "劇団アレン舞台「積チノカベ」衣装提供",
    "EYESCREAM 写真連載「Paris et Tourbillon」（全6回）",
  ], exhibitions: ["Case Gallery（代々木八幡）「渦写展」"] },
  { year: "2018", items: [
    "Asia Design Exhibition Consortium",
    "カンボジア王立プノンペン大学 展示",
    "映画「猫は抱くもの」衣装ペインティング",
  ], exhibitions: ["Case Gallery（代々木八幡）「渦展」"] },
  { year: "2017", items: [
    "スターバックス 二子玉川店 作品展示",
    "郷ひろみ 全国ツアー「My Dear」衣装ペインティング",
    "Girls Award 2017 AAA（SHINJIRO ATAE）衣装",
  ] },
  { year: "2016", items: ["Superfly「Into The Circle」全国ツアー・紅白歌合戦・TV衣装ペインティング"] },
  { year: "2015", items: ["Superfly「WHITE」衣装ペインティング"] },
];

// プロフィール／ステートメント（2026-09 クライアント提供の最終原稿）。段落ごとに配列化。
const STATEMENT = [
  ["苦痛を昇華するために始まった渦に、その時々の人生から生まれた詩と言葉を重ねてきた。"],
  ["渦は、同じ場所を巡っているように見えながら、少しずつ位置を変え、同じ地点には二度と戻らない。", "私の人生もまた、同じ悩みに何度も戻る。けれど、そこに向き合う自分は毎回違う。"],
  ["私が変われば、渦も変わる。", "生きる時代が変われば、問いも変わる。", "だから、同じ渦を描いても同じ渦にはならない。"],
  ["私は、この行為を続けた先に、", "「渦を80年描き続けた、100歳のおばあちゃん」", "になることを目指している。"],
  ["毎年、「渦とは何か」「なぜ私は渦を描き続けるのか」を問い直し、その年の探究を作品として残す。", "同時に、その年の渦を自らの顔と身体に描き、言葉と写真とともに、一年ずつ記録していく。"],
  ["一人の人間が、生涯ひとつの形を反復し続けたとき、何が変わり、何が最後まで残るのか。"],
  ["80年分の渦を並べた時、そこに私がどう生き、どう変わり、それでも何を手放さなかったのかが残っていてほしい。"],
  ["私は、自分の人生そのものを使って、その変化を記録し続ける。"],
];

export default function AboutPage() {
  return (
    <div className="container-main py-20 md:py-28">
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
              2015年から、「渦」を描き続けている。
            </p>
          </Reveal>

          <Reveal className="mt-14">
            <div className="mb-4 flex items-center gap-4">
              <span className="h-8 w-8 text-[var(--color-muted)]">
                <Spiral className="spin-slow h-full w-full" />
              </span>
              <h2 className="font-display text-sm tracking-[0.2em] text-[var(--color-muted)]">
                Statement
              </h2>
            </div>
            <div className="space-y-6 text-sm leading-loose">
              {STATEMENT.map((lines, i) => (
                <p key={i}>
                  {lines.map((line, j) => (
                    <span key={j} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              ))}
            </div>
          </Reveal>

        </div>
      </div>

      {/* History：縦に長くなりすぎないよう、全幅で年ごとのブロックを段組み（SP 1列 / タブレット 2列 / PC 3列） */}
      <Reveal className="mt-24 md:mt-32">
        <div className="flex items-baseline justify-between border-b border-[var(--color-line)] pb-4">
          <h2 className="font-display text-sm tracking-[0.2em] text-[var(--color-muted)]">
            History
          </h2>
          <p className="text-[0.625rem] tracking-[0.2em] text-[var(--color-muted)]">
            {HISTORY[HISTORY.length - 1].year} — {HISTORY[0].year}
          </p>
        </div>
      </Reveal>
      <div className="history-grid mt-10 gap-x-12 sm:columns-2 lg:columns-3">
        {HISTORY.map(({ year, items, exhibitions }) => (
          <HistoryYear key={year} year={year}>
            <ul className="mt-3 space-y-1.5 text-xs leading-relaxed tracking-wider-jp">
              {[
                ...items.map((t) =>
                  typeof t === "string" ? (
                    t
                  ) : (
                    <a
                      href={t.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 hover:opacity-60"
                    >
                      {t.text} ↗
                    </a>
                  )
                ),
                ...(exhibitions ?? []).map((t) => (
                  <>
                    <span className="mr-2 inline-block border border-[var(--color-ink)] px-1.5 text-[0.5625rem] leading-4 tracking-[0.15em] align-[1px]">
                      Exhibition
                    </span>
                    {t}
                  </>
                )),
              ].map((node, i) => (
                <li
                  key={i}
                  className="history-item"
                  style={{ transitionDelay: `${0.45 + i * 0.12}s` }}
                >
                  {node}
                </li>
              ))}
            </ul>
          </HistoryYear>
        ))}
      </div>
    </div>
  );
}
