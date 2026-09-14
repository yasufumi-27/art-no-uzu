// 作品ごとの Instagram 投稿URL（クライアントから「画像ファイル名 → 投稿リンク」のセットで受領）。
// キーは public/images/works 内のファイル名から枚数を除いた作品ID（例：2015-1 → "2015_1"、2025_5_3.jpg → "2025_5"）。
// URL は共有用パラメータ（?utm_source=…&stkn=…）を外して登録する。
// ここに無い作品は公式アカウントのトップへリンクする。
export const INSTAGRAM_LINKS = {
  // 2015（2026-09-14 受領）
  "2015_1": "https://www.instagram.com/p/0DbaBfMzLF/",
  "2015_2": "https://www.instagram.com/p/0smGLaszCv/",
  "2015_3": "https://www.instagram.com/p/4dbiOsszMX/",
  "2015_4": "https://www.instagram.com/p/9VgfifMzC1/",
  "2015_5": "https://www.instagram.com/p/78x2ajMzEW/",
  "2015_6": "https://www.instagram.com/p/05dY7MszJJ/",
  "2015_7": "https://www.instagram.com/p/-lHkoWMzPo/",
  "2015_8": "https://www.instagram.com/p/_BGqaGszLp/",
};
