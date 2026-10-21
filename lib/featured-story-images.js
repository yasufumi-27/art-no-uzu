import { asset } from "@/lib/asset";

// 2026-10-21 受領「アーカイブ 3.zip」。スクリーンショットの左から順。
// 横スクロール専用。最上部の6枚・下の9枚グリッドとは別に管理する。
export const FEATURED_STORY_IMAGES = [
  { source: "P1188586-2.jpg" },
  { source: "DSC01735-2.jpg", workId: "2025_1" },
  { source: "P1189168.jpg" },
  { source: "DSC08009のコピー.JPG" },
  { source: "DSC_0509.JPG", workId: "2024_5" },
].map((image, index) => ({
  ...image,
  id: `story-20261021-${index + 1}`,
  images: [asset(`/images/top/story-20261021-${index + 1}.webp`)],
  href: image.workId ? `/works/${image.workId}` : "/works",
}));
