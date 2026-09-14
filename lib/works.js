// 作品・展示データ。
// 画像は public/images/works（クライアント受領の元データを WebP 化）から scripts/gen-works.mjs が一覧化し、
// Instagram 投稿URLは lib/instagram-links.js で作品IDごとに紐付ける。
// 本番では microCMS のコンテンツに置き換える。データ構造は仕様書「14. 作品データ仕様」に準拠。
//
// category: "Works" | "Exhibition"
// hasDetail: 専用詳細ページを持つ作品（仕様書 10.1）。対象5作品はクライアント回答待ちのため現在は無し。
// title / material / size は作品情報の受領後に DETAILS へ追記する。
import { WORK_IMAGES } from "@/lib/works.generated";
import { INSTAGRAM_LINKS } from "@/lib/instagram-links";
import { asset } from "@/lib/asset";

// 公式Instagram（個別の投稿URLが未登録の作品のリンク先）
export const INSTAGRAM =
  "https://www.instagram.com/art_no_uzu?igsh=ZmdjZXJveWJyMHJt";

// 作品IDごとの追加情報（タイトル・素材・サイズ・説明・詳細ページ化など）。例：
//   "2026_16": { title: "…", material: "アクリル・キャンバス", size: "…", hasDetail: true, description: "…" },
const DETAILS = {};

export const works = WORK_IMAGES.map((w) => {
  const d = DETAILS[w.id] ?? {};
  return {
    id: w.id,
    year: w.year,
    category: d.category ?? w.category,
    title: d.title ?? "",
    series: d.series ?? null,
    material: d.material ?? null,
    size: d.size ?? null,
    description: d.description ?? "",
    hasDetail: Boolean(d.hasDetail),
    instagram: INSTAGRAM_LINKS[w.id] ?? INSTAGRAM,
    hasPost: Boolean(INSTAGRAM_LINKS[w.id]),
    // 一覧用の縮小版とフルサイズ
    thumb: asset(`${w.images[0]}-thumb.webp`),
    images: w.images.map((src) => asset(`${src}.webp`)),
  };
});

// 画像の代替テキスト（タイトル未登録の間は年と番号で表す）
export function workAlt(work) {
  return work.title || `${work.year}年の作品`;
}

// Coming Soon（2027年）— 仕様書 9.3。一覧では最も左（先頭）に表示。
export const comingSoonYear = 2027;

// 表示対象の年（2015〜2026）を降順で。
export const years = Array.from(new Set(works.map((w) => w.year))).sort(
  (a, b) => b - a
);

export function getWork(id) {
  return works.find((w) => w.id === id);
}

export function detailWorks() {
  return works.filter((w) => w.hasDetail);
}
