// 活動歴（2026-09 クライアント提供の確定リスト）。
// exhibitions は原稿の「●EXHIBITION」以下の項目。
// links は項目の出典・関連ページ（2026-09-15 に公式サイト・一次情報を中心に確認できた分だけ付与。見つからない項目は空のまま）。
const L = (label, href) => ({ label, href });
export const HISTORY = [
  { year: "2026", items: [
    { text: "南種子島ふるさと納税返礼品・ひいらぎ 銀座本店 抹茶マカロン パッケージデザイン（Shinfula）" },
    { text: "曙酒造 domaine dawn ワインパッケージデザイン" },
  ] },
  { year: "2025", items: [
    { text: "『渦に沈む』", exhibition: true,
      detail: "GOOD DESIGN賞受賞「アートゴールデン街」（NOXGALLERY × SUPERCHIEF × BRILLIA）\nYAHOO!ニュース掲載",
      linksLayout: "stacked", links: [
        L("GOOD DESIGN", "https://www.g-mark.org/gallery/winners/30972"),
        L("東京建物", "https://tatemono.com/news/20241127.html"),
      ],
    },
    { text: "個展「生まれた喜び」", exhibition: true,
      detail: "CONCENT SHIBUYA（渋谷）", linksWithDetail: true,
      links: [L("YOUTUBE", "https://www.youtube.com/watch?v=gL5-xlRYAus")],
    },
    { text: "SEKAI NO OWARI「図鑑」リリース記念ショートムービー制作" },
  ] },
  { year: "2024", items: [], exhibitions: [{ text: "Gallery GOBANGURA（京都）個展「渦展 Vol.3」" }] },
  { year: "2023", items: [
    { text: "PSG（パリ・サンジェルマンFC）コラボ", links: [L("PSG Japan", "https://x.com/psgjapan/status/1726534038146715772")] },
    { text: "NIKE エアフォース 1広告出演", links: [L("ABC-MART", "https://gs.abc-mart.net/feature/22574/")] },
    { text: "第8回インフルエンサー・アワード・ジャパン2023 ENTERTAINMENT部門 最優秀賞", links: [L("IAJ 2023", "https://lp.spirit-japan.com/iaj/2023/")] },
  ] },
  { year: "2022", items: [
    { text: "劇団アレン舞台「いい人間の教科書」衣装提供（カンゲキ大賞受賞）" },
  ] },
  { year: "2020", items: [
    { text: "白石聖 写真展「COLOR」衣装提供", links: [L("TOKION", "https://tokion.jp/2020/11/24/sei-shiraishi-color/")] },
    { text: "劇団アレン舞台「シカク」衣装提供", links: [L("公式", "http://allen-co.com/allen-shikaku/")] },
  ] },
  { year: "2019", items: [
    { text: "劇団アレン舞台「積チノカベ」衣装提供", links: [L("公式", "http://allen-co.com/the-wall/")] },
    { text: "EYESCREAM 写真連載「Paris et Tourbillon」（全6回）", links: [L("EYESCREAM", "https://eyescream.jp/?s=Paris+et+Tourbillon")] },
  ], exhibitions: [
    { text: "Case Gallery（代々木八幡）「渦写展」" },
  ] },
  { year: "2018", items: [
    { text: "Asia Design Exhibition Consortium", links: [L("公式", "https://asiadesignart.wixsite.com/ada2018")] },
    { text: "カンボジア王立プノンペン大学 展示", links: [L("公式", "https://asiadesignart.wixsite.com/ada2018")] },
    { text: "映画「猫は抱くもの」衣装ペインティング", links: [L("映画.com", "https://eiga.com/movie/88358/")] },
  ], exhibitions: [
    { text: "Case Gallery（代々木八幡）「渦展」" },
  ] },
  { year: "2017", items: [
    { text: "スターバックス 二子玉川店 作品展示" },
    { text: "郷ひろみ 全国ツアー「My Dear」衣装ペインティング", links: [L("Sony Music", "https://www.sonymusic.co.jp/artist/HiromiGo/discography/SRBL-1774")] },
    { text: "Girls Award 2017 AAA（SHINJIRO ATAE）衣装" },
  ] },
  { year: "2016", items: [
    { text: "Superfly「Into The Circle」全国ツアー・紅白歌合戦・TV衣装ペインティング", links: [L("Superfly", "https://www.superfly-web.com/discography/?id=80")] },
  ] },
  { year: "2015", items: [
    { text: "Superfly「WHITE」衣装ペインティング", links: [L("Warner Music", "https://wmg.jp/superfly/discography/15121/")] },
  ] },
];

