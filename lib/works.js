// 作品・展示データ（デモ用）。
// 神谷佳美（ART NO UZU）の実在する作品タイトル・世界観を反映（ARTIST_PROFILE.md 参照）。
// 本番では microCMS のコンテンツに置き換える。データ構造は仕様書「14. 作品データ仕様」に準拠。
//
// category: "Works" | "Exhibition"
// hasDetail: 専用詳細ページを持つ作品（仕様書 10.1、全5件）は true

// 公式Instagram。将来、作品ごとに個別投稿URLへ差し替え予定。
const INSTAGRAM =
  "https://www.instagram.com/art_no_uzu?igsh=ZmdjZXJveWJyMHJt";

// ── 専用詳細ページあり（5件）─ 実在タイトルより ─────────────────
export const works = [
  {
    id: "w-uzu-jyuku",
    title: "生まれた喜び『淑』",
    year: 2026,
    category: "Works",
    series: "渦",
    material: "アクリル・キャンバス",
    size: "1167 × 910 mm",
    hasDetail: true,
    gallery: 4,
    description:
      "生まれてきたこと、その喜びを渦に託した一枚。無数の一筆が集まり、ひとつの生命のように脈打つ。渦は、感情であり、呼吸であり、記録であり、祈り。",
    instagram: INSTAGRAM,
  },
  {
    id: "w-uzu-kurage",
    title: "夜を泳ぐ海月",
    year: 2024,
    category: "Works",
    series: "渦",
    material: "アクリル・キャンバス",
    size: "910 × 727 mm",
    hasDetail: true,
    gallery: 3,
    description:
      "深い夜の中を、ゆっくりと漂う海月。静けさの奥で渦が呼吸を続け、闇のなかに仄かな光を宿す。",
    instagram: INSTAGRAM,
  },
  {
    id: "e-uzu-ten-2018",
    title: "渦展",
    year: 2018,
    category: "Exhibition",
    series: null,
    material: "個展 / 代々木八幡 Case Gallery",
    size: "会場：Case Gallery, 東京",
    hasDetail: true,
    gallery: 5,
    description:
      "渦だけを描き続けてきた歩みを一堂に集めた個展。反復のなかに宿る時間そのものを、空間として体験する。",
    instagram: INSTAGRAM,
  },
  {
    id: "w-uzu-kiri",
    title: "霧が晴れゆくように",
    year: 2021,
    category: "Works",
    series: "渦",
    material: "アクリル・キャンバス",
    size: "727 × 606 mm",
    hasDetail: true,
    gallery: 3,
    description:
      "立ち込めた霧が少しずつ晴れ、景色が輪郭を取り戻す瞬間。迷いのあとに訪れる、静かな希望を渦に重ねた。",
    instagram: INSTAGRAM,
  },
  {
    id: "w-uzu-hikari",
    title: "ここが光、あなたが見る景色がこれからも。",
    year: 2016,
    category: "Works",
    series: "渦",
    material: "アクリル・キャンバス",
    size: "1303 × 1620 mm",
    hasDetail: true,
    gallery: 4,
    description:
      "あなたが立つその場所こそが光。これから見ていく景色が、いつまでも続いていくように——祈りを込めた大作。",
    instagram: INSTAGRAM,
  },
];

// ── ポップアップ + Instagram 誘導（専用ページなし）を年別に生成 ─────
// 実在タイトルを織り交ぜつつ、各年に作品を配置する。
const REAL_TITLES = [
  "音の奥に。",
  "巡り合いながら。",
  "飛躍するように",
  "花火",
  "繋げる",
  "TEARS",
];
const EXTRA_TITLES = [
  "渦の記録",
  "呼吸する渦",
  "祈りのかたち",
  "めぐる",
  "生きた時間",
  "静かな渦",
];

let seed = 0;
for (let year = 2015; year <= 2026; year++) {
  const count = 5;
  for (let i = 1; i <= count; i++) {
    const title =
      seed < REAL_TITLES.length
        ? REAL_TITLES[seed]
        : `${EXTRA_TITLES[seed % EXTRA_TITLES.length]} ${year}-${i}`;
    works.push({
      id: `p-${year}-${String(i).padStart(2, "0")}`,
      title,
      year,
      category: i % 5 === 0 ? "Exhibition" : "Works",
      series: "渦",
      material: i % 2 === 0 ? "アクリル・キャンバス" : "ドローイング",
      size: i % 2 === 0 ? "606 × 500 mm" : null,
      hasDetail: false,
      description:
        "ひと筆ずつ重ねた渦の集積。渦は、感情であり、呼吸であり、記録であり、祈り。詳細は Instagram にて。",
      instagram: INSTAGRAM,
    });
    seed++;
  }
}

// Coming Soon（2027年）— 仕様書 9.3。一覧では最も左（先頭）に表示。
export const comingSoonYear = 2027;

// 表示対象の年（2015〜2026）を降順で。
export const years = Array.from(
  new Set(works.map((w) => w.year))
).sort((a, b) => b - a);

export function getWork(id) {
  return works.find((w) => w.id === id);
}

export function detailWorks() {
  return works.filter((w) => w.hasDetail);
}
