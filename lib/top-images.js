import { asset } from "@/lib/asset";

// TOP指定は9枚。top6〜9は未受領のため、受領済み5枚のみ使用。
// 追加時は配列に6, 7, 8, 9を加える。
export const TOP_IMAGES = [1, 2, 3, 4, 5].map((n) => ({
  id: `top${n}`, thumb: asset(`/images/top/top${n}-thumb.webp`),
  images: [asset(`/images/top/top${n}.webp`)],
  title: "", year: "", category: "Works", hasDetail: true,
  href: "/works", linkLabel: "Works / Exhibition",
}));
