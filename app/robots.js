import { SITE_URL } from "@/lib/site";

// robots.txt 生成（仕様書 17）。静的エクスポート時にビルドで出力する。
export const dynamic = "force-static";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
