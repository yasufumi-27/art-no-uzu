// 作品・展示データ（デモ用）。
// 本番では microCMS のコンテンツに置き換える。データ構造は仕様書「14. 作品データ仕様」に準拠。
//
// category: "Works" | "Exhibition"
// hasDetail: 専用詳細ページを持つ作品（仕様書 10.1、全5件）は true
// images: 詳細ページのギャラリー用に複数枚を想定（デモではプレースホルダーを生成）

// 公式Instagram。将来、作品ごとに個別投稿URLへ差し替え予定。
const INSTAGRAM =
  "https://www.instagram.com/art_no_uzu?igsh=ZmdjZXJveWJyMHJt";

export const works = [
  // ── 専用詳細ページあり（5件）──────────────────────────────
  {
    id: "w-2026-01",
    title: "静寂の残響",
    year: 2026,
    category: "Works",
    series: "残響",
    material: "油彩・キャンバス",
    size: "1620 × 1303 mm",
    hasDetail: true,
    gallery: 4,
    description:
      "沈黙が満ちた空間に、かすかに残る音の記憶を描いた。糸のような線が張り詰め、緊張と静けさが同居する。",
    instagram: INSTAGRAM,
  },
  {
    id: "w-2025-01",
    title: "夜の輪郭",
    year: 2025,
    category: "Works",
    series: "輪郭",
    material: "アクリル・キャンバス",
    size: "1167 × 910 mm",
    hasDetail: true,
    gallery: 3,
    description:
      "闇の中で立ち上がる輪郭。存在と不在のあわいを、余白によって描き出そうとした一枚。",
    instagram: INSTAGRAM,
  },
  {
    id: "e-2025-01",
    title: "個展「間 — Ma」",
    year: 2025,
    category: "Exhibition",
    series: null,
    material: "インスタレーション",
    size: "会場：THE GALLERY / 東京",
    hasDetail: true,
    gallery: 5,
    description:
      "空間全体を作品とした個展の記録。無数の糸が張り巡らされ、来場者は『間』の中を歩く。",
    instagram: INSTAGRAM,
  },
  {
    id: "w-2024-01",
    title: "白の重力",
    year: 2024,
    category: "Works",
    series: "重力",
    material: "石膏・顔料",
    size: "910 × 727 mm",
    hasDetail: true,
    gallery: 3,
    description:
      "白の層が幾重にも積もり、静かな質量を持つ。触れられそうで触れられない距離を意識した。",
    instagram: INSTAGRAM,
  },
  {
    id: "e-2024-01",
    title: "グループ展「Still」",
    year: 2024,
    category: "Exhibition",
    series: null,
    material: "混合技法",
    size: "会場：Art Space N / 京都",
    hasDetail: true,
    gallery: 4,
    description:
      "『静止』をテーマにしたグループ展への出展作。動きの一歩手前で留まる緊張を封じ込めた。",
    instagram: INSTAGRAM,
  },
];

// ── 専用ページなし（ポップアップ + Instagram 誘導）を年別に自動生成 ──────
const SERIES = ["残響", "輪郭", "重力", "余白", null];
const MATERIALS = ["油彩・キャンバス", "アクリル・キャンバス", "ドローイング", "混合技法"];

for (let year = 2020; year <= 2026; year++) {
  const count = year >= 2024 ? 5 : 6;
  for (let i = 1; i <= count; i++) {
    works.push({
      id: `p-${year}-${String(i).padStart(2, "0")}`,
      title: `無題 ${year}-${i}`,
      year,
      category: i % 4 === 0 ? "Exhibition" : "Works",
      series: SERIES[(year + i) % SERIES.length],
      material: MATERIALS[i % MATERIALS.length],
      size: i % 2 === 0 ? "727 × 606 mm" : null,
      hasDetail: false,
      description:
        "余白と沈黙のあいだに置かれた小品。詳細は Instagram にて公開しています。",
      instagram: INSTAGRAM,
    });
  }
}

// Coming Soon（2027年）— 仕様書 9.3
export const comingSoonYear = 2027;

export const years = Array.from(
  new Set(works.map((w) => w.year))
).sort((a, b) => b - a);

export function getWork(id) {
  return works.find((w) => w.id === id);
}

export function detailWorks() {
  return works.filter((w) => w.hasDetail);
}
