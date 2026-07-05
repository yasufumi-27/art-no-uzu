import Reveal from "@/components/Reveal";
import { placeholder } from "@/lib/placeholder";

export const metadata = {
  title: "About",
  description:
    "アーティストのプロフィール、ステートメント、活動歴を紹介します。",
};

const HISTORY = [
  ["2026", "個展「静寂の残響」/ 東京"],
  ["2025", "個展「間 — Ma」/ THE GALLERY, 東京"],
  ["2024", "グループ展「Still」/ Art Space N, 京都"],
  ["2022", "アートフェア出展 / 大阪"],
  ["2020", "制作活動を本格的に開始"],
];

export default function AboutPage() {
  return (
    <div className="container-main py-20 md:py-28">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <div className="aspect-[4/5] w-full overflow-hidden bg-[var(--color-line)]">
            <img
              src={placeholder("about-portrait", 4 / 5)}
              alt="アーティストポートレート"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <h1 className="text-3xl font-light tracking-wider-jp">About</h1>
            <p className="mt-8 text-sm leading-loose">
              静けさと緊張のあわいを主題に制作を続ける画家。
              余白と間（ま）を手がかりに、見る者と作品との距離そのものを問い直す。
            </p>
          </Reveal>

          <Reveal className="mt-14">
            <h2 className="text-sm tracking-wider-jp text-[var(--color-muted)]">
              Statement
            </h2>
            <p className="mt-4 text-sm leading-loose">
              描くことは、消すことでもある。
              重ねた層のあいだに沈黙を残し、語りすぎないことで、
              作品はようやく呼吸を始める。私はその「間」に立ち会いたい。
            </p>
          </Reveal>

          <Reveal className="mt-14">
            <h2 className="text-sm tracking-wider-jp text-[var(--color-muted)]">
              Selected Exhibitions
            </h2>
            <dl className="mt-6 space-y-3 border-t border-[var(--color-line)] pt-6 text-xs">
              {HISTORY.map(([year, text]) => (
                <div key={year} className="flex gap-6">
                  <dt className="w-14 shrink-0 tracking-wider-jp text-[var(--color-muted)]">
                    {year}
                  </dt>
                  <dd className="tracking-wider-jp">{text}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
