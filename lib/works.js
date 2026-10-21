// 作品・展示データ。
// 画像は public/images/works（クライアント受領の元データを WebP 化）から scripts/gen-works.mjs が一覧化し、
// リンク先（Instagram 投稿・Web 記事など）と Exhibition の区別は lib/work-links.js で作品IDごとに紐付ける。
// 本番では microCMS のコンテンツに置き換える。データ構造は仕様書「14. 作品データ仕様」に準拠。
//
// category: "Works" | "Exhibition" | "Collaboration" | "Essay"
// hasDetail: 2024〜2026年の作品および展示を専用詳細ページとして公開。
// title / material / size は作品情報の受領後に DETAILS へ追記する。
import { WORK_IMAGES } from "@/lib/works.generated";
import { WORK_LINKS, EXHIBITION_IDS } from "@/lib/work-links";
import { asset } from "@/lib/asset";
import QUALITY from "@/lib/work-quality.json";
import { WORK_DETAILS } from "@/lib/work-details";

// 画像の「細部スコア」（../素材/scripts/sharpness.py で元データから計測）。
// スクリーンショットや拡大画像は低く出る。目視で 2 以上ならサイト上で大きく見せても粗さが目立たない。
export const SHARP_THRESHOLD = 2;

// 公式Instagram（個別の投稿URLが未登録の作品のリンク先）
export const INSTAGRAM =
  "https://www.instagram.com/art_no_uzu?igsh=ZmdjZXJveWJyMHJt";

// 作品IDごとの追加情報（タイトル・素材・サイズ・説明・詳細ページ化など）。例：
//   "2026_16": { title: "…", material: "アクリル・キャンバス", size: "…", hasDetail: true, description: "…" },
const DETAILS = WORK_DETAILS;

// 同一展示へ統合した旧URLは、詳細ページから統合先へ案内する。
export const WORK_REDIRECTS = { "2019_2": "2019_1", "2019_3": "2019_1", "2019_4": "2019_1", "2019_5": "2019_1", "2023_3": "2023_2", "2018_3": "2018_4", "2018_5": "2018_4", "2018_6": "2018_4" };

// 2026-10-13 回答の掲載終了・年度移動を反映。原本画像は保持。
const HIDDEN_IDS = new Set([...Object.keys(WORK_REDIRECTS), "2022_7", "2016_3", "2016_4", "2023_8", "2026_3", "2026_6", "2026_13", "2026_16"]);

// 一覧の目印に出すリンク先の名前
function linkLabel(url) {
  const host = new URL(url).hostname;
  if (host.endsWith("instagram.com")) return "Instagram";
  if (host === "x.com" || host.endsWith("twitter.com")) return "X";
  if (host.endsWith("eyescream.jp")) return "Web Magazine";
  return "Web";
}

export const works = WORK_IMAGES.filter((w) => !HIDDEN_IDS.has(w.id)).map((w) => {
  const d = DETAILS[w.id] ?? {};
  const images = d.imageSources ?? (d.imageOrder ? d.imageOrder.map(n => w.images.find(src => src.endsWith(`_${n}`))).filter(Boolean) : w.images);
  const url = d.instagram ?? WORK_LINKS[w.id] ?? INSTAGRAM;
  return {
    id: w.id,
    year: w.year,
    category: d.category ?? (EXHIBITION_IDS.has(w.id) ? "Exhibition" : "Works"),
    title: d.title ?? "",
    englishTitle: d.englishTitle ?? null,
    series: d.series ?? null,
    material: d.material ?? null,
    size: d.size ?? null,
    description: d.description ?? "",
    poem: d.poem ?? "",
    period: d.period ?? null,
    venue: d.venue ?? null,
    article: d.article ?? null,
    websiteUrl: d.websiteUrl ?? null,
    essayUrl: d.essayUrl ?? null,
    awardUrl: d.awardUrl ?? null,
    purchaseUrl: d.purchaseUrl ?? null,
    bookUrl: d.bookUrl ?? null,
    bookTitle: d.bookTitle ?? null,
    bookImage: d.bookImage ? asset(d.bookImage) : null,
    priority: d.priority ?? 0,
    hasDetail: Boolean(d.hasDetail) || w.year >= 2024 || EXHIBITION_IDS.has(w.id),
    instagram: url,
    linkLabel: linkLabel(url),
    sharp: (QUALITY[w.id] ?? 0) >= SHARP_THRESHOLD,
    // 一覧用の縮小版とフルサイズ
    thumb: asset(`${images[0]}-thumb.webp`),
    images: images.map((src) => asset(`${src}.webp`)),
  };
}).sort((a, b) => a.priority - b.priority);

// 画像の代替テキスト（タイトル未登録の間は年と番号で表す）
export function workAlt(work) {
  return work.title || (work.year ? `${work.year}年の作品` : "神谷佳美 作品");
}

// Coming Soon（2027年）— 仕様書 9.3。一覧では最も左（先頭）に表示。
export const comingSoonYear = 2027;

// 表示対象の年（2015〜2026）を降順で。
export const years = Array.from(new Set(works.map((w) => w.year))).sort(
  (a, b) => b - a
);

export function getWork(id) {
  return works.find((w) => w.id === (WORK_REDIRECTS[id] ?? id));
}

export function detailWorks() {
  return works.filter((w) => w.hasDetail);
}
