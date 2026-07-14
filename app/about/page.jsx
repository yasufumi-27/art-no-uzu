import Reveal from "@/components/Reveal";
import Spiral from "@/components/Spiral";
import FadeImg from "@/components/FadeImg";
import { placeholder } from "@/lib/placeholder";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "About",
  description:
    "神谷佳美（Kamitani Yoshimi）。1994年東京生まれ。2014年より渦を描き続けるアーティストのプロフィール・ステートメント・活動歴。",
  alternates: { canonical: `${SITE_URL}/about/` },
  openGraph: {
    title: "About — ART NO UZU",
    description:
      "神谷佳美（Kamitani Yoshimi）。1994年東京生まれ。2014年より渦を描き続けるアーティストのプロフィール・ステートメント・活動歴。",
  },
};

// 経歴（ARTIST_PROFILE.md より）
const HISTORY = [
  ["2025", "SEKAI NO OWARI 新曲『図鑑』ショートムービー制作"],
  ["2024", "SNS総再生回数 5,100万回突破"],
  ["2023", "NIKE／エアフォース1 広告出演 / インフルエンサー・アワード・ジャパン ENTERTAINMENT部門 最優秀賞"],
  ["2019", "個展「渦写展」/ Case Gallery, 代々木八幡 ・ パリを中心に海外活動へ"],
  ["2018", "個展「渦展」/ Case Gallery, 代々木八幡 ・ 映画『猫は抱くもの』衣装制作"],
  ["2017", "郷ひろみ 全国ツアー「My Dear」/ Girls Award 2017 AAA"],
  ["2016", "個展 / 原宿DOG ・ Superfly「Into The Circle」衣装ペインティング"],
  ["2015", "Superfly「WHITE」衣装ペインティング（NHK紅白歌合戦）"],
  ["2014", "渦を描き始める"],
];

export default function AboutPage() {
  return (
    <div className="container-main py-20 md:py-28">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-line)]">
            <FadeImg
              src={placeholder("about-portrait", 4 / 5)}
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
              KAMITANI YOSHIMI
            </p>
            <p className="mt-8 text-sm leading-loose">
              1994年東京生まれ。2014年より、ただひとつのモチーフ「渦」を描き続けている。
              目指すのは、80年間渦を描き続けた100歳のおばあちゃんになること。
              生涯の最後の一筆まで、渦を描いていく。
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
            <p className="text-sm leading-loose">
              渦は、感情であり、呼吸であり、記録であり、祈り。
              <br />
              私は、飾るための絵は描いていない。
              歳を重ねるほどに絵は深みを増し、あなたがあなたらしく生きていく生涯に、そっと寄り添っていく。
              一筆ずつ重ねた反復の集積は、そのまま生きた時間の記録になる。
            </p>
          </Reveal>

          <Reveal className="mt-14">
            <h2 className="font-display text-sm tracking-[0.2em] text-[var(--color-muted)]">
              Selected Works &amp; History
            </h2>
            <dl className="mt-6 space-y-3 border-t border-[var(--color-line)] pt-6 text-xs">
              {HISTORY.map(([year, text]) => (
                <div key={year} className="flex gap-6">
                  <dt className="w-14 shrink-0 tracking-wider-jp text-[var(--color-muted)]">
                    {year}
                  </dt>
                  <dd className="tracking-wider-jp leading-relaxed">{text}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
