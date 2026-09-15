// 作品ごとのリンク先（クライアントのスプレッドシート「YOSHIMI_HP掲載Instaリンク」2026-09-14 取得）。
// キーは public/images/works 内のファイル名から枚数を除いた作品ID（例：2015-1 → "2015_1"、2025_5_3.jpg → "2025_5"）。
// 多くは Instagram の投稿／リールだが、Web 記事や X の投稿もある（一覧の目印はリンク先から自動で出し分け）。
// URL は共有用パラメータ（?utm_source=…&stkn=…）を外して登録する。ここに無い作品は公式アカウントのトップへリンクする。
//
// シートの注記：
//   2018-4〜6 は1つの投稿（exhibition）。2019-2・5・6 と 2018-21・22 は同じ投稿。
//   2023-2・3 はセルの表示が ABC-MART のページ、埋め込みリンクが Instagram リール（C0TvWG0yAY9）。
//   ABC-MART 側は商品紹介ページで本人への言及がなかったため（2026-09-15 確認）、埋め込みのリールを採用。
//   2026_1〜15 は末尾に投稿リンクが1つだけあるため、同じ投稿として全作品に適用。2026_16・17 は「リンクまだ」。
//   2022_7 はシートに記載なし。
export const WORK_LINKS = {
  // 2015
  "2015_1": "https://www.instagram.com/p/0DbaBfMzLF/",
  "2015_2": "https://www.instagram.com/p/0smGLaszCv/",
  "2015_3": "https://www.instagram.com/p/4dbiOsszMX/",
  "2015_4": "https://www.instagram.com/p/9VgfifMzC1/",
  "2015_5": "https://www.instagram.com/p/78x2ajMzEW/",
  "2015_6": "https://www.instagram.com/p/05dY7MszJJ/",
  "2015_7": "https://www.instagram.com/p/-lHkoWMzPo/",
  "2015_8": "https://www.instagram.com/p/_BGqaGszLp/",

  // 2016
  "2016_1": "https://www.instagram.com/p/BAdrWZcszGK/",
  "2016_2": "https://www.instagram.com/p/BBSQ--eMzIv/",
  "2016_3": "https://www.instagram.com/p/BBSR13cszKR/",
  "2016_4": "https://www.instagram.com/p/BC7xpG3szG5/",
  "2016_5": "https://www.instagram.com/p/BEGXnvpszLf/",
  "2016_6": "https://www.instagram.com/p/BFjGbfqMzDl/",
  "2016_7": "https://www.instagram.com/p/BIHhymigc-e/",
  "2016_8": "https://www.instagram.com/p/BIVODPchhsc/",
  "2016_9": "https://www.instagram.com/p/BIxMiD7hr-0/",
  "2016_10": "https://www.instagram.com/p/BIxZXKJhXbp/",
  "2016_11": "https://www.instagram.com/p/BKtO-3bBoIC/",
  "2016_12": "https://www.instagram.com/p/BNTz1vshj-g/",

  // 2017
  "2017_1": "https://www.instagram.com/p/BPRYwAehSMM/",
  "2017_2": "https://www.instagram.com/p/BPnECWThZRp/",
  "2017_3": "https://www.instagram.com/p/BQPh9nyBNuu/",
  "2017_4": "https://www.instagram.com/p/BQbYU80BOva/",
  "2017_5": "https://www.instagram.com/p/BQbhypgBMmJ/",
  "2017_6": "https://www.instagram.com/p/BQk2XrnhI1u/",
  "2017_7": "https://www.instagram.com/p/BR8ne3pBHp6/",
  "2017_8": "https://www.instagram.com/p/BTTt_VlBUGH/",
  "2017_9": "https://www.instagram.com/p/BVgjvzgBFxA/",
  "2017_10": "https://www.instagram.com/p/BV99vEPh9ls/",
  "2017_11": "https://www.instagram.com/p/BZTf7Y-n_NW/",
  "2017_12": "https://www.instagram.com/p/BajhMcTn13I/",
  "2017_13": "https://www.instagram.com/p/BXFIBZ4hbcr/",
  "2017_14": "https://www.instagram.com/p/Bb1lktlnS1b/",
  "2017_15": "https://www.instagram.com/p/BdXTNnhn_6w/",
  "2017_16": "https://www.instagram.com/p/DYO2mEuifhZ/",

  // 2018
  "2018_1": "https://www.instagram.com/p/BfF_zdRn46h/",
  "2018_2": "https://www.instagram.com/p/BfVDDJPnMze/",
  "2018_3": "https://www.instagram.com/p/BgAmhOPBsmJ/",
  "2018_4": "https://www.instagram.com/p/BhOXMOGH-ya/",
  "2018_5": "https://www.instagram.com/p/BhOXMOGH-ya/",
  "2018_6": "https://www.instagram.com/p/BhOXMOGH-ya/",
  "2018_7": "https://www.instagram.com/p/BhlZfWlgTXG/",
  "2018_8": "https://www.instagram.com/p/BlKUZbrA3Jy/",
  "2018_9": "https://www.instagram.com/p/Bl8EZFkgWX6/",
  "2018_10": "https://www.instagram.com/p/BmXMe8_AGvf/",
  "2018_11": "https://www.instagram.com/p/BmzgSb2A3XN/",
  "2018_12": "https://www.instagram.com/p/Bn54rPfAm07/",
  "2018_13": "https://www.instagram.com/p/BpZIX9OBtfZ/",
  "2018_14": "https://www.instagram.com/p/Bpv4GcJBd-r/",
  "2018_15": "https://www.instagram.com/p/BqwRRsjhtuI/",
  "2018_16": "https://www.instagram.com/p/BqzSJ9uhjHp/",
  "2018_17": "https://www.instagram.com/p/Bq__IDuBWBZ/",
  "2018_18": "https://www.instagram.com/p/BrNozFHAAPn/",
  "2018_19": "https://www.instagram.com/p/Brph4WTA3aY/",
  "2018_20": "https://www.instagram.com/p/BhbQAzSADzf/",
  "2018_21": "https://www.instagram.com/p/BehXTQ8HJ89/",
  "2018_22": "https://www.instagram.com/p/BehXTQ8HJ89/",

  // 2019
  "2019_1": "https://www.instagram.com/p/Bscu1MoApCU/",
  "2019_2": "https://www.instagram.com/p/BtqCH5RAXEH/",
  "2019_3": "https://www.instagram.com/p/BtYTKx3AT4h/",
  "2019_4": "https://www.instagram.com/p/Bui7ka8gnRG/",
  "2019_5": "https://www.instagram.com/p/BtqCH5RAXEH/",
  "2019_6": "https://www.instagram.com/p/BtqCH5RAXEH/",
  "2019_7": "https://www.instagram.com/p/BwZkuCpBlii/",
  "2019_8": "https://www.instagram.com/p/ByV3Fv4hqX6/",
  "2019_9": "https://eyescream.jp/culture/49622/",
  "2019_10": "https://eyescream.jp/culture/53567/",
  "2019_11": "https://eyescream.jp/culture/55345/",

  // 2020
  "2020_1": "https://eyescream.jp/culture/57191/",
  "2020_2": "https://eyescream.jp/culture/59556/",
  "2020_3": "https://eyescream.jp/culture/62083/",
  "2020_4": "https://www.instagram.com/p/CIF5yzfj-ip/",
  "2020_5": "https://www.instagram.com/p/CI-FXcSDjAd/",
  "2020_6": "https://www.instagram.com/p/CIdEJuOjoOV/",
  "2020_7": "https://www.instagram.com/p/CI2Wt14DO7S/",
  "2020_8": "https://www.instagram.com/p/CJBHrGhjF3v/",

  // 2021
  "2021_1": "https://www.instagram.com/p/CLMbN2TDkcw/",
  "2021_2": "https://www.instagram.com/p/COAcowxDKJx/",
  "2021_3": "https://www.instagram.com/p/CPahAX1D7nO/",
  "2021_4": "https://www.instagram.com/p/CRJP4iRjIUj/",
  "2021_5": "https://www.instagram.com/p/CSeiVbYhODm/",
  "2021_6": "https://www.instagram.com/p/CTjs-z0HM2o/",
  "2021_7": "https://www.instagram.com/p/CUHwzh2BWA6/",
  "2021_8": "https://www.instagram.com/p/CYTozcVvMXG/",
  "2021_9": "https://www.instagram.com/p/CX0qUBHv7n2/",

  // 2022
  "2022_1": "https://www.instagram.com/p/CY6OhAwPoS_/",
  "2022_2": "https://www.instagram.com/p/CarkC0XvgkS/",
  "2022_3": "https://www.instagram.com/p/Ca11s0UPIc2/",
  "2022_4": "https://www.instagram.com/p/Cb-D8fFvIdI/",
  "2022_5": "https://www.instagram.com/p/Cdfw0s6PyFr/",
  "2022_6": "https://www.instagram.com/reel/Cs3F8m4gXBi/",

  // 2023
  "2023_1": "https://x.com/psgjapan/status/1726534038146715772",
  "2023_2": "https://www.instagram.com/reel/C0TvWG0yAY9/",
  "2023_3": "https://www.instagram.com/reel/C0TvWG0yAY9/",
  "2023_4": "https://lp.spirit-japan.com/iaj/2023/",
  "2023_5": "https://www.instagram.com/reel/CtjDEPJAWQa/",
  "2023_6": "https://www.instagram.com/reel/Cs_eKKxgRHa/",
  "2023_7": "https://www.instagram.com/reel/CwPf-3DMWEO/",
  "2023_8": "https://www.instagram.com/reel/C0DiFceS2C8/",
  "2023_9": "https://www.instagram.com/reel/CuElalpga28/",

  // 2024
  "2024_1": "https://www.instagram.com/reel/DBSxqtVym0L/",
  "2024_2": "https://www.instagram.com/reel/C_Ez94Jymhl/",

  // 2025
  "2025_1": "https://www.instagram.com/reel/DEtJ07DybiS/",
  "2025_2": "https://www.instagram.com/p/DTu43cpCexD/",
  "2025_3": "https://www.instagram.com/p/DPQ7vHuCbqF/",
  "2025_4": "https://www.instagram.com/p/DQ9rmIKj3FX/",
  "2025_5": "https://www.instagram.com/reel/DQL4XE3iQSF/",
  "2025_6": "https://www.instagram.com/p/DJv6aC2yM0h/",
  "2025_7": "https://www.instagram.com/reel/DNskWwAUpKz/",

  // 2026
  "2026_1": "https://www.instagram.com/p/DVPk9bZD3XE/",
  "2026_2": "https://www.instagram.com/p/DVPk9bZD3XE/",
  "2026_3": "https://www.instagram.com/p/DVPk9bZD3XE/",
  "2026_4": "https://www.instagram.com/p/DVPk9bZD3XE/",
  "2026_5": "https://www.instagram.com/p/DVPk9bZD3XE/",
  "2026_6": "https://www.instagram.com/p/DVPk9bZD3XE/",
  "2026_7": "https://www.instagram.com/p/DVPk9bZD3XE/",
  "2026_8": "https://www.instagram.com/p/DVPk9bZD3XE/",
  "2026_9": "https://www.instagram.com/p/DVPk9bZD3XE/",
  "2026_10": "https://www.instagram.com/p/DVPk9bZD3XE/",
  "2026_11": "https://www.instagram.com/p/DVPk9bZD3XE/",
  "2026_12": "https://www.instagram.com/p/DVPk9bZD3XE/",
  "2026_13": "https://www.instagram.com/p/DVPk9bZD3XE/",
  "2026_14": "https://www.instagram.com/p/DVPk9bZD3XE/",
  "2026_15": "https://www.instagram.com/p/DVPk9bZD3XE/",
};

// シート上で exhibition と注記された作品
export const EXHIBITION_IDS = new Set([
  "2018_4", "2018_5", "2018_6",
  "2019_1", "2019_2", "2019_3", "2019_4", "2019_5",
  "2024_1",
  "2025_1", "2025_3", "2025_4", "2025_5",
]);

// 作品画像を持たない関連リンク（シートの各年タブ末尾にあったもの）。Works / Exhibition の該当年の末尾に文字のカードで並べる。
export const YEAR_EXTRAS = [
  {
    year: 2024,
    kind: "Essay",
    title: "エッセイ & 作品集",
    note: "来歴 / エッセイ",
    href: "https://uzu.my.canva.site/zine",
  },
  {
    year: 2025,
    kind: "Essay",
    title: "生まれた喜び",
    note: "個展「生まれた喜び」のエッセイ",
    href: "https://online.fliphtml5.com/yoshimikamitani/jvhb/",
  },
  {
    year: 2025,
    kind: "Award",
    title: "GOOD DESIGN AWARD 2025",
    note: "「アートゴールデン街」（展示「渦に沈む」）受賞",
    href: "https://www.g-mark.org/gallery/winners/30972",
  },
];

// 同じ画像を使っている作品の組（リンク先だけが違う）。TOP の WORKS / EXHIBITION では各組から1つだけ表示する。
// /works/ の年別一覧では、それぞれの年にそのまま載せる。
export const SAME_IMAGE_GROUPS = [
  // PSG コラボのサッカーボール：2022_7（リンク未登録＝Instagram アカウント）と 2023_1（PSG Japan の X 投稿）
  ["2022_7", "2023_1"],
];
