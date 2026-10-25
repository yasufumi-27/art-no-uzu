import { asset } from "./asset";

// 2026-10-21受領の年別追加写真。年・順序・リンク先は客先指定。
const additions = [
  {
    "year": 2018,
    "id": "2018-addition-01",
    "sourceName": "IMG_0286_Original",
    "url": "https://www.instagram.com/p/BgAmhOPBsmJ/",
    "image": "/images/works/additions/2018-addition-01.webp"
  },
  {
    "year": 2018,
    "id": "2018-addition-02",
    "sourceName": "スクリーンショット 2026-10-20 21.24.21",
    "url": "https://www.instagram.com/p/BhsfPKxAd7k/",
    "image": "/images/works/additions/2018-addition-02.webp"
  },
  {
    "year": 2018,
    "id": "2018-addition-03",
    "sourceName": "スクリーンショット 2026-10-20 21.25.41",
    "url": "https://www.instagram.com/p/BiTxB47AZwR/",
    "image": "/images/works/additions/2018-addition-03.webp"
  },
  {
    "year": 2018,
    "id": "2018-addition-04",
    "sourceName": "スクリーンショット 2026-10-20 21.26.39",
    "url": "https://www.instagram.com/p/BiRHk4EgJK1/",
    "image": "/images/works/additions/2018-addition-04.webp"
  },
  {
    "year": 2018,
    "id": "2018-addition-05",
    "sourceName": "スクリーンショット 2026-10-20 21.28.05",
    "url": "https://www.instagram.com/p/BjmC4l_gItV/",
    "image": "/images/works/additions/2018-addition-05.webp"
  },
  {
    "year": 2018,
    "id": "2018-addition-06",
    "sourceName": "スクリーンショット 2026-10-20 21.28.47",
    "url": "https://www.instagram.com/p/BjrhHmPgHeI/",
    "image": "/images/works/additions/2018-addition-06.webp"
  },
  {
    "year": 2018,
    "id": "2018-addition-07",
    "sourceName": "スクリーンショット 2026-10-20 21.29.53",
    "url": "https://www.instagram.com/p/BnGPZsCgaqF/",
    "image": "/images/works/additions/2018-addition-07.webp"
  },
  {
    "year": 2019,
    "id": "2019-addition-01",
    "sourceName": "IMG_6828",
    "url": "https://www.instagram.com/p/BxjSaXRh5so/",
    "image": "/images/works/additions/2019-addition-01.webp"
  },
  {
    "year": 2023,
    "id": "2023-addition-01",
    "sourceName": "スクリーンショット 2026-10-20 19.34.42",
    "url": "https://www.instagram.com/reel/Cn6ypZnAGdG/",
    "image": "/images/works/additions/2023-addition-01.webp"
  },
  {
    "year": 2023,
    "id": "2023-addition-02",
    "sourceName": "IMG_3536",
    "url": "https://www.instagram.com/reel/Cr-nafPAgYw/",
    "image": "/images/works/additions/2023-addition-02.webp"
  },
  {
    "year": 2023,
    "id": "2023-addition-03",
    "sourceName": "元絵インフルpng",
    "url": "https://www.instagram.com/reel/Csf9kMkgx2r/",
    "image": "/images/works/additions/2023-addition-03.webp"
  },
  {
    "year": 2023,
    "id": "2023-addition-04",
    "sourceName": "元絵モンスターズインク",
    "url": "https://www.instagram.com/reel/CsikiNTA9au/",
    "image": "/images/works/additions/2023-addition-04.webp"
  },
  {
    "year": 2023,
    "id": "2023-addition-05",
    "sourceName": "元絵エヴァ",
    "url": "https://www.instagram.com/reel/CtTxpkagAXv/",
    "image": "/images/works/additions/2023-addition-05.webp"
  },
  {
    "year": 2023,
    "id": "2023-addition-06",
    "sourceName": "TEARS",
    "url": "https://www.instagram.com/reel/CtjDEPJAWQa/",
    "image": "/images/works/additions/2023-addition-06.webp"
  },
  {
    "year": 2023,
    "id": "2023-addition-07",
    "sourceName": "元絵モネ",
    "url": "https://www.instagram.com/reel/CuElalpga28/",
    "image": "/images/works/additions/2023-addition-07.webp"
  },
  {
    "year": 2023,
    "id": "2023-addition-08",
    "sourceName": "IMG_8235のコピー",
    "url": "https://www.instagram.com/reel/CuXHNPxgJTJ/",
    "image": "/images/works/additions/2023-addition-08.webp"
  },
  {
    "year": 2023,
    "id": "2023-addition-09",
    "sourceName": "元絵ジブリ",
    "url": "https://www.instagram.com/reel/Cu1hr0UNjee/",
    "image": "/images/works/additions/2023-addition-09.webp"
  },
  {
    "year": 2023,
    "id": "2023-addition-10",
    "sourceName": "元ハリーぽったー",
    "url": "https://www.instagram.com/reel/Cu3-J4ig74Z/",
    "image": "/images/works/additions/2023-addition-10.webp"
  },
  {
    "year": 2023,
    "id": "2023-addition-11",
    "sourceName": "C37442F7-1289-4B5C-802A-13B30924EB0D",
    "url": "https://www.instagram.com/reel/Cvcm_b0gfLV/",
    "image": "/images/works/additions/2023-addition-11.webp"
  },
  {
    "year": 2023,
    "id": "2023-addition-12",
    "sourceName": "EFC97B73-7654-475F-8489-D2C7DE37DFD2 2",
    "url": "https://www.instagram.com/reel/CwANlSHAK5i/",
    "image": "/images/works/additions/2023-addition-12.webp"
  },
  {
    "year": 2023,
    "id": "2023-addition-13",
    "sourceName": "2c77c2d8-c874-4fe1-b115-c9bd7ad1acea",
    "url": "https://www.instagram.com/reel/Cs_eKKxgRHa/",
    "image": "/images/works/additions/2023-addition-13.webp"
  },
  {
    "year": 2023,
    "id": "2023-addition-14",
    "sourceName": "元９９９",
    "url": "https://www.instagram.com/reel/CwPf-3DMWEO/",
    "image": "/images/works/additions/2023-addition-14.webp"
  },
  {
    "year": 2023,
    "id": "2023-addition-15",
    "sourceName": "元ピクミン",
    "url": "https://www.instagram.com/reel/CwzmjDqSeWA/",
    "image": "/images/works/additions/2023-addition-15.webp"
  },
  {
    "year": 2023,
    "id": "2023-addition-16",
    "sourceName": "元ミク",
    "url": "https://www.instagram.com/reel/CxjyzQOSFcS/",
    "image": "/images/works/additions/2023-addition-16.webp"
  },
  {
    "year": 2023,
    "id": "2023-addition-17",
    "sourceName": "ロゴフリーレン２",
    "url": "https://www.instagram.com/reel/CxxgzcnSoVX/",
    "image": "/images/works/additions/2023-addition-17.webp"
  },
  {
    "year": 2023,
    "id": "2023-addition-18",
    "sourceName": "IMG_7237",
    "url": "https://www.instagram.com/reel/CziUbsLSIRc/",
    "image": "/images/works/additions/2023-addition-18.webp"
  },
  {
    "year": 2023,
    "id": "2023-addition-19",
    "sourceName": "椿",
    "url": "https://www.instagram.com/reel/C0DiFceS2C8/",
    "image": "/images/works/additions/2023-addition-19.webp"
  },
  {
    "year": 2023,
    "id": "2023-addition-20",
    "sourceName": "92147FB7-3DFE-45CC-ADFE-BEE19C012ABC",
    "url": "https://www.instagram.com/reel/CvE5Mh6gi1h/",
    "image": "/images/works/additions/2023-addition-20.webp"
  },
  {
    "year": 2023,
    "id": "2023-addition-21",
    "sourceName": "SEA",
    "url": "https://www.instagram.com/p/CjxfkgUPG9o/",
    "image": "/images/works/additions/2023-addition-21.webp"
  },
  {
    "year": 2023,
    "id": "2023-addition-22",
    "sourceName": "IF",
    "url": "https://www.instagram.com/p/CkBDEluyIE5/",
    "image": "/images/works/additions/2023-addition-22.webp"
  },
  {
    "year": 2023,
    "id": "2023-addition-23",
    "sourceName": "IMG_4249_Original",
    "url": "https://www.instagram.com/p/Cm1HBMeSvj-/",
    "image": "/images/works/additions/2023-addition-23.webp"
  },
  {
    "year": 2023,
    "id": "2023-addition-24",
    "sourceName": "元絵HANA",
    "url": "https://www.instagram.com/p/CnHH5dySfw0/",
    "image": "/images/works/additions/2023-addition-24.webp"
  },
  {
    "year": 2023,
    "id": "2023-addition-25",
    "sourceName": "元ハロウィン",
    "url": "https://youtube.com/shorts/dQ5vnOv1uFM",
    "image": "/images/works/additions/2023-addition-25.webp"
  },
  {
    "year": 2023,
    "id": "2023-addition-26",
    "sourceName": "IMG_1841",
    "url": "https://www.instagram.com/reel/CwfAWwbMtsJ/",
    "image": "/images/works/additions/2023-addition-26.webp"
  },
  {
    "year": 2024,
    "id": "2024-addition-01",
    "sourceName": "IMG_0884",
    "url": "https://www.instagram.com/reel/C50UkYsSyVh/",
    "image": "/images/works/additions/2024-addition-01.webp"
  },
  {
    "year": 2024,
    "id": "2024-addition-02",
    "sourceName": "DEEP",
    "url": "https://www.instagram.com/reel/C9t8_PgyfGM/",
    "image": "/images/works/additions/2024-addition-02.webp"
  },
  {
    "year": 2024,
    "id": "2024-addition-03",
    "sourceName": "IMG_3081",
    "url": "https://www.instagram.com/reel/C_iIXvQS0jr/",
    "image": "/images/works/additions/2024-addition-03.webp"
  },
  {
    "year": 2024,
    "id": "2024-addition-04",
    "sourceName": "IMG_8042",
    "url": "https://www.instagram.com/reel/C0TvWG0yAY9/",
    "image": "/images/works/additions/2024-addition-04.webp"
  },
  {
    "year": 2024,
    "id": "2024-addition-05",
    "sourceName": "IMG_7980",
    "url": "https://www.instagram.com/reel/C3b2_Bxv56Q/",
    "image": "/images/works/additions/2024-addition-05.webp"
  },
  {
    "year": 2024,
    "id": "2024-addition-06",
    "sourceName": "来世",
    "url": "https://www.instagram.com/reel/DDMbKetSxGP/",
    "image": "/images/works/additions/2024-addition-06.webp"
  },
  {
    "year": 2024,
    "id": "2024-addition-07",
    "sourceName": "IMG_1407",
    "url": "https://www.instagram.com/reel/C7yoiopSJip/",
    "image": "/images/works/additions/2024-addition-07.webp"
  },
  {
    "year": 2024,
    "id": "2024-addition-08",
    "sourceName": "IMG_2420",
    "url": "https://www.instagram.com/reel/C_C3WUkyOOJ/",
    "image": "/images/works/additions/2024-addition-08.webp"
  },
  {
    "year": 2024,
    "id": "2024-addition-09",
    "sourceName": "IMG_8922_VSCO",
    "url": "https://www.instagram.com/reel/C4pciPZSe7z/",
    "image": "/images/works/additions/2024-addition-09.webp"
  },
  {
    "year": 2024,
    "id": "2024-addition-10",
    "sourceName": "LINE",
    "url": "https://www.instagram.com/reel/C1_y3SGyJbh/",
    "image": "/images/works/additions/2024-addition-10.webp"
  },
  {
    "year": 2024,
    "id": "2024-addition-11",
    "sourceName": "IMG_3582",
    "url": "https://www.instagram.com/reel/C5dNCmQy2AH/",
    "image": "/images/works/additions/2024-addition-11.webp"
  },
  {
    "year": 2024,
    "id": "2024-addition-12",
    "sourceName": "IMG_4227",
    "url": "https://www.instagram.com/reel/C8bnMUEyY-1/",
    "image": "/images/works/additions/2024-addition-12.webp"
  },
  {
    "year": 2026,
    "id": "2026-addition-01",
    "sourceName": "スクリーンショット 2026-10-20 21.03.03",
    "url": "https://www.instagram.com/reel/DVBMCNSCXOV/",
    "image": "/images/works/additions/2026-addition-01.webp"
  },
{
  "year": 2026,
  "id": "2026-addition-02",
  "sourceName": "DSC_5252",
  "url": "https://www.instagram.com/p/Dcdc7g1CdUc/",
  "image": "/images/works/additions/2026-addition-02.webp"
},
{
  "year": 2026,
  "id": "2026-addition-03",
  "sourceName": "DSC08250",
  "url": "https://www.instagram.com/p/DWd_-3_Cct0/",
  "image": "/images/works/additions/2026-addition-03.webp"
},
{
  "year": 2026,
  "id": "2026-addition-04",
  "sourceName": "DSC_4580",
  "url": null,
  "image": "/images/works/additions/2026-addition-04.webp"
}
,{
  year: 2024, id: "2024-addition-13", sourceName: "ゴッホ",
  url: "https://www.instagram.com/reel/DCEdSueyobD/?vrfl=MTZ2cTNudTVzbWNwdg==",
  image: "/images/works/additions/2024-addition-13.webp"
}, {
  year: 2024, id: "2024-addition-14", sourceName: "ジブリ",
  url: "https://www.instagram.com/reel/C8Qx6euSh-I/?psln=aWhzc21uenlhYm1x",
  image: "/images/works/additions/2024-addition-14.webp"
},
{
  "year": 2020,
  "id": "2020-addition-20261023-1",
  "sourceName": "スクリーンショット 2026-10-23 0.26.57",
  "url": "https://www.instagram.com/p/CGAPFyIj0UD/?utm_source=ig_web_copy_link&srtk=MzRlODBiNWFlZA==",
  "image": "/images/works/additions/2020-addition-20261023-1.webp"
},
{
  "year": 2020,
  "id": "2020-addition-20261023-2",
  "sourceName": "スクリーンショット 2026-10-23 0.29.56",
  "url": "https://www.instagram.com/p/B804soNoB68/?utm_source=ig_web_copy_link&psln=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==",
  "image": "/images/works/additions/2020-addition-20261023-2.webp"
},
{
  "year": 2020,
  "id": "2020-addition-20261023-3",
  "sourceName": "スクリーンショット 2026-10-23 0.34.20",
  "url": "https://www.instagram.com/p/B6-ccKRiMPS/?utm_source=ig_web_copy_link&xtok=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==",
  "image": "/images/works/additions/2020-addition-20261023-3.webp"
},
{
  "year": 2020,
  "id": "2020-addition-20261023-4",
  "sourceName": "スクリーンショット 2026-10-23 0.35.23",
  "url": "https://www.instagram.com/p/B7QcPBjCSq7/?utm_source=ig_web_copy_link&dlrf=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==",
  "image": "/images/works/additions/2020-addition-20261023-4.webp"
},
{
  "year": 2019,
  "id": "2019-addition-20261023-1",
  "sourceName": "スクリーンショット 2026-10-23 0.41.19",
  "url": "https://www.instagram.com/p/Bshp9WfgOQU/?utm_source=ig_web_copy_link&psln=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==",
  "image": "/images/works/additions/2019-addition-20261023-1.webp"
},
{
  "year": 2019,
  "id": "2019-addition-20261023-2",
  "sourceName": "スクリーンショット 2026-10-23 0.42.23",
  "url": "https://www.instagram.com/p/BspfOjiAnov/?utm_source=ig_web_copy_link&rpxt=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==",
  "image": "/images/works/additions/2019-addition-20261023-2.webp"
},
{
  "year": 2019,
  "id": "2019-addition-20261023-3",
  "sourceName": "スクリーンショット 2026-10-23 0.54.32",
  "url": "https://www.instagram.com/p/Bvg7HHRgVwi/?utm_source=ig_web_copy_link&cplk=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==",
  "image": "/images/works/additions/2019-addition-20261023-3.webp"
},
{
  "year": 2019,
  "id": "2019-addition-20261023-4",
  "sourceName": "スクリーンショット 2026-10-23 0.55.49",
  "url": "https://www.instagram.com/p/BveFPf8AOrV/?utm_source=ig_web_copy_link&cplk=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==",
  "image": "/images/works/additions/2019-addition-20261023-4.webp"
},
{
  "year": 2019,
  "id": "2019-addition-20261023-5",
  "sourceName": "スクリーンショット 2026-10-23 0.58.09",
  "url": "https://www.instagram.com/p/ByDAh-XBTte/?utm_source=ig_web_copy_link&dlrf=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==",
  "image": "/images/works/additions/2019-addition-20261023-5.webp"
},
{
  "year": 2019,
  "id": "2019-addition-20261023-6",
  "sourceName": "スクリーンショット 2026-10-23 0.59.06",
  "url": "https://www.instagram.com/p/ByV3Fv4hqX6/?utm_source=ig_web_copy_link&mdxt=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==",
  "image": "/images/works/additions/2019-addition-20261023-6.webp"
},
{
  "year": 2019,
  "id": "2019-addition-20261023-7",
  "sourceName": "スクリーンショット 2026-10-23 1.00.35",
  "url": "https://www.instagram.com/p/B1r6FT4iqOJ/?utm_source=ig_web_copy_link&srtk=MzRlODBiNWFlZA==",
  "image": "/images/works/additions/2019-addition-20261023-7.webp"
},
{
  "year": 2022,
  "id": "2022-addition-20261023-1",
  "sourceName": "スクリーンショット 2026-10-23 0.10.22",
  "url": "https://www.instagram.com/p/CZB7DCvPEFb/",
  "image": "/images/works/additions/2022-addition-20261023-1.webp"
},
{
  "year": 2022,
  "id": "2022-addition-20261023-2",
  "sourceName": "スクリーンショット 2026-10-23 0.12.02",
  "url": "https://www.instagram.com/p/CfJaoG9PD-k/",
  "image": "/images/works/additions/2022-addition-20261023-2.webp"
},
{
  "year": 2022,
  "id": "2022-addition-20261023-3",
  "sourceName": "スクリーンショット 2026-10-23 0.13.11",
  "url": "https://www.instagram.com/p/CkBDEluyIE5/",
  "image": "/images/works/additions/2022-addition-20261023-3.webp"
},
{
  "year": 2021,
  "id": "2021-addition-20261023-1",
  "sourceName": "スクリーンショット 2026-10-23 0.17.37",
  "url": "https://www.instagram.com/p/CKWYj77jTtd/",
  "image": "/images/works/additions/2021-addition-20261023-1.webp"
},
{
  "year": 2018,
  "id": "2018-addition-20261023-1",
  "sourceName": "スクリーンショット 2026-10-23 9.58.28",
  "url": "https://www.instagram.com/p/BfQGXqVHedr/",
  "image": "/images/works/additions/2018-addition-20261023-1.webp"
},
{
  "year": 2018,
  "id": "2018-addition-20261023-2",
  "sourceName": "スクリーンショット 2026-10-23 10.00.16",
  "url": "https://www.instagram.com/p/Bh7QQtGg_Nj/",
  "image": "/images/works/additions/2018-addition-20261023-2.webp"
},
{
  "year": 2018,
  "id": "2018-addition-20261023-3",
  "sourceName": "スクリーンショット 2026-10-23 11.25.19",
  "url": "https://www.instagram.com/p/BgYYywTBlky/",
  "image": "/images/works/additions/2018-addition-20261023-3.webp"
},
{
  "year": 2017,
  "id": "2017-addition-20261025-1",
  "sourceName": "スクリーンショット 2026-10-24 23.30.36",
  "url": "https://timgallo.exposure.co/niji-iro",
  "image": "/images/works/additions/2017-addition-20261025-1.webp"
},
{
  "year": 2017,
  "id": "2017-addition-20261025-2",
  "sourceName": "スクリーンショット 2026-10-24 23.31.03",
  "url": "https://timgallo.exposure.co/niji-iro",
  "image": "/images/works/additions/2017-addition-20261025-2.webp"
},
{
  "year": 2017,
  "id": "2017-addition-20261025-3",
  "sourceName": "スクリーンショット 2026-10-24 23.33.17",
  "url": "https://www.instagram.com/p/BToYXW8BZSH/",
  "image": "/images/works/additions/2017-addition-20261025-3.webp"
},
{
  "year": 2017,
  "id": "2017-addition-20261025-4",
  "sourceName": "スクリーンショット 2026-10-24 23.41.33",
  "url": "https://www.instagram.com/p/BdEY1ZOHIKh/",
  "image": "/images/works/additions/2017-addition-20261025-4.webp"
},
{
  "year": 2017,
  "id": "2017-addition-20261025-5",
  "sourceName": "スクリーンショット 2026-10-25 0.00.21",
  "url": "https://www.instagram.com/p/BUyftdihBXc/",
  "image": "/images/works/additions/2017-addition-20261025-5.webp"
},
{
  "year": 2017,
  "id": "2017-addition-20261025-6",
  "sourceName": "スクリーンショット 2026-10-25 0.03.41",
  "url": "https://www.instagram.com/p/BTjOHgmhr1F/",
  "image": "/images/works/additions/2017-addition-20261025-6.webp"
},
{
  "year": 2017,
  "id": "2017-addition-20261025-7",
  "sourceName": "スクリーンショット 2026-10-25 0.05.12",
  "url": "https://www.instagram.com/p/BSgKrblhsb8/",
  "image": "/images/works/additions/2017-addition-20261025-7.webp"
},
{
  "year": 2017,
  "id": "2017-addition-20261025-8",
  "sourceName": "スクリーンショット 2026-10-25 0.15.13",
  "url": "https://www.instagram.com/p/BUEqkVrhMqk/",
  "image": "/images/works/additions/2017-addition-20261025-8.webp"
},
{
  "year": 2017,
  "id": "2017-addition-20261025-9",
  "sourceName": "スクリーンショット 2026-10-25 0.16.37",
  "url": "https://www.instagram.com/p/BWbT71fhbJ4/",
  "image": "/images/works/additions/2017-addition-20261025-9.webp"
},
{
  "year": 2017,
  "id": "2017-addition-20261025-10",
  "sourceName": "スクリーンショット 2026-10-25 0.51.04",
  "url": "https://www.instagram.com/p/BaTx4MWHAUh/",
  "image": "/images/works/additions/2017-addition-20261025-10.webp"
},
{
  "year": 2017,
  "id": "2017-addition-20261025-11",
  "sourceName": "スクリーンショット 2026-10-25 0.44.08",
  "url": "https://www.instagram.com/p/BWP9zo6Biww/",
  "image": "/images/works/additions/2017-addition-20261025-11.webp"
},
{
  "year": 2017,
  "id": "2017-addition-20261025-12",
  "sourceName": "1",
  "url": "https://www.instagram.com/p/Bb1ZKZ1nzv-/",
  "image": "/images/works/additions/2017-addition-20261025-12.webp"
},
{
  "year": 2017,
  "id": "2017-addition-20261025-13",
  "sourceName": "2",
  "url": "https://www.instagram.com/p/Bb1YiJ5n1-d/",
  "image": "/images/works/additions/2017-addition-20261025-13.webp"
},
{
  "year": 2017,
  "id": "2017-addition-20261025-14",
  "sourceName": "3",
  "url": "https://www.instagram.com/p/Bb1YS6HH3CN/",
  "image": "/images/works/additions/2017-addition-20261025-14.webp"
},
{
  "year": 2017,
  "id": "2017-addition-20261025-15",
  "sourceName": "4",
  "url": "https://www.instagram.com/p/Bb1YMMyHpSi/",
  "image": "/images/works/additions/2017-addition-20261025-15.webp"
},
{
  "year": 2017,
  "id": "2017-addition-20261025-16",
  "sourceName": "5",
  "url": "https://www.instagram.com/p/Bb1X6bVHIsH/",
  "image": "/images/works/additions/2017-addition-20261025-16.webp"
},
{
  "year": 2017,
  "id": "2017-addition-20261025-17",
  "sourceName": "6",
  "url": "https://www.instagram.com/p/Bb1WHlSndSf/",
  "image": "/images/works/additions/2017-addition-20261025-17.webp"
},
{
  "year": 2017,
  "id": "2017-addition-20261025-18",
  "sourceName": "7",
  "url": "https://www.instagram.com/p/Bb1Vi7rnJ1d/",
  "image": "/images/works/additions/2017-addition-20261025-18.webp"
},
{
  "year": 2017,
  "id": "2017-addition-20261025-19",
  "sourceName": "8",
  "url": "https://www.instagram.com/p/BaKIaIbno6n/",
  "image": "/images/works/additions/2017-addition-20261025-19.webp"
}
];

export const ARCHIVE_ADDITIONS = additions.map(row => ({
  ...row, title: "", category: "Works", hasDetail: false,
  instagram: row.url, linkLabel: row.url?.includes("youtube.com") ? "YouTube" : "Instagram",
  thumb: asset(row.image.replace(".webp", "-thumb.webp")),
  images: [asset(row.image)],
}));
