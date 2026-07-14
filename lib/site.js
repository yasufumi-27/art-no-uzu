// サイト共通定数（SEO / メタ情報で使用。仕様書 17）。
// デモは GitHub Pages（/art-no-uzu 配下）。本番（Vercel + 独自ドメイン）移行時は
// NEXT_PUBLIC_SITE_ORIGIN を独自ドメインに、NEXT_PUBLIC_BASE_PATH を空にする。

// オリジン（metadataBase 用。Next.js は OGP 画像 URL に basePath を自動付与するため、
// metadataBase には basePath を含めないこと）
export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://yasufumi-27.github.io";

// 配信サブパス込みのサイト URL（sitemap / robots / 構造化データ用）
export const SITE_URL = `${SITE_ORIGIN}${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}`;

export const SITE_NAME = "ART NO UZU";

export const SITE_DESCRIPTION =
  "神谷佳美（Kamitani Yoshimi）公式サイト。2014年より渦だけを描き続けるアーティストの作品（Works / Exhibition）・展示記録・プロフィール。渦は、感情であり、呼吸であり、記録であり、祈り。";

// 構造化データでアーティスト（Person）を一意に参照するための @id。
// layout の Person 定義と、作品詳細ページの creator 参照で共有する。
export const ARTIST_ID = `${SITE_URL}/#artist`;
