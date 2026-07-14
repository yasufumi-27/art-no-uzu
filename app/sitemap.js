import { detailWorks } from "@/lib/works";
import { SITE_URL } from "@/lib/site";

// サイトマップ生成（仕様書 17）。静的エクスポート時にビルドで sitemap.xml を出力する。
export const dynamic = "force-static";

export default function sitemap() {
  const pages = [
    { path: "/", priority: 1.0 },
    { path: "/works/", priority: 0.9 },
    { path: "/about/", priority: 0.7 },
    { path: "/contact/", priority: 0.6 },
    { path: "/privacy/", priority: 0.3 },
    ...detailWorks().map((w) => ({
      path: `/works/${w.id}/`,
      priority: 0.8,
    })),
  ];

  return pages.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}
