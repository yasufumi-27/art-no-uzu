import { asset } from "@/lib/asset";

// 2026-10-21 受領。iCloud Drive/_work/アーカイブの6枚を指定スクリーンショット順に使用。
// TOP最上部専用。下部の手動作品ギャラリー・9枚グリッドとは独立させる。
// HP差し替え.zip の top1 / top3 / top5 を対応するスライドに反映。
export const HERO_IMAGES = [
  { source: "top1.jpg", file: "hero-20261021-replacement-1.webp", position: "50% 50%" },
  { source: "P1295914.RW2", position: "50% 26%" },
  { source: "top3.jpg", file: "hero-20261021-replacement-3.webp", position: "50% 50%" },
  { source: "IMG_8983.HEIC", position: "50% 50%" },
  { source: "top5.heic", file: "hero-20261021-replacement-5.webp", position: "50% 50%" },
  { source: "P1177565-4.jpg", position: "50% 48%" },
].map((image, index) => ({
  ...image,
  id: `hero-20261021-${index + 1}`,
  src: asset(`/images/top/${image.file || `hero-20261021-${index + 1}.webp`}`),
  title: "",
  year: "",
}));
