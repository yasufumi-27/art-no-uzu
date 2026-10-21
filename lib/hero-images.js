import { asset } from "@/lib/asset";

// 2026-10-21 受領。iCloud Drive/_work/アーカイブの6枚を指定スクリーンショット順に使用。
// TOP最上部専用。下部の手動作品ギャラリー・9枚グリッドとは独立させる。
export const HERO_IMAGES = [
  { source: "P1285014.jpg", position: "50% 50%" },
  { source: "P1295914.RW2", position: "50% 26%" },
  { source: "IMG_6729.jpg", position: "50% 50%" },
  { source: "IMG_8983.HEIC", position: "50% 50%" },
  { source: "TEARS.PNG", position: "50% 50%" },
  { source: "P1177565-4.jpg", position: "50% 48%" },
].map((image, index) => ({
  ...image,
  id: `hero-20261021-${index + 1}`,
  src: asset(`/images/top/hero-20261021-${index + 1}.webp`),
  title: "",
  year: "",
}));
