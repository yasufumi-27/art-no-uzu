import { asset } from "@/lib/asset";

// 2026-10-13 回答で、受領済み5枚のまま使用することを確認。
export const TOP_IMAGES = [1, 2, 3, 4, 5].map((n) => ({
  id: `top${n}`, thumb: asset(`/images/top/top${n}-thumb.webp`),
  images: [asset(`/images/top/top${n}.webp`)],
  title: "", year: "", category: "Works", hasDetail: true,
  href: "/works", linkLabel: "Works / Exhibition",
}));
