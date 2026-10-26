import { asset } from "@/lib/asset";
import { getWork } from "@/lib/works";

// 同じ作品の別画像もランダム4枠に入れない。画像を追加・変更したら対応IDも更新する。
const ARCHIVE_IDS = {
  1: ["2025_1"],
  2: ["2023_4", "2023_5"],
  3: ["2018_2"],
  4: ["2025_5"],
  5: ["2024_2"],
};

// 2026-10-13 回答で、受領済み5枚のまま使用することを確認。
export const TOP_IMAGES = [1, 2, 3, 4, 5].map((n) => {
  const archiveIds = ARCHIVE_IDS[n] ?? [];
  const work = getWork(n === 2 ? "2023_5" : archiveIds[0]);
  return {
    id: `top${n}`, thumb: asset(`/images/top/top${n}-thumb.webp`),
    images: [asset(`/images/top/top${n}.webp`)],
    title: work?.title || "", year: work?.year || "", category: work?.category || "Works", hasDetail: Boolean(work?.hasDetail),
    href: work?.hasDetail ? `/works/${work.id}` : undefined,
    instagram: work?.instagram,
    linkLabel: work?.linkLabel || "Works / Exhibition",
    archiveIds,
  };
});
