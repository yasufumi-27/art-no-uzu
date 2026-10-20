import { asset } from "@/lib/asset";
import { getWork } from "@/lib/works";

// 同じ作品の別画像もランダム4枠に入れない。画像を追加・変更したら対応IDも更新する。
const ARCHIVE_IDS = {
  2: ["2023_4", "2023_5"],
  3: ["2018_2"],
  5: ["2024_2"],
};

// 2026-10-13 回答で、受領済み5枚のまま使用することを確認。
export const TOP_IMAGES = [1, 2, 3, 4, 5].map((n) => {
  const archiveIds = ARCHIVE_IDS[n] ?? [];
  const detail = archiveIds.map(getWork).find((work) => work?.hasDetail);
  return {
    id: `top${n}`, thumb: asset(`/images/top/top${n}-thumb.webp`),
    images: [asset(`/images/top/top${n}.webp`)],
    title: "", year: "", category: "Works", hasDetail: true,
    href: detail ? `/works/${detail.id}` : "/works",
    linkLabel: detail?.title || "Works / Exhibition",
    archiveIds,
  };
});
