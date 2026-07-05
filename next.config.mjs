/** @type {import('next').NextConfig} */

// GitHub Pages（プロジェクトページ）では /<repo>/ 配下で配信されるため basePath を付与する。
// Vercel など独自ドメイン運用へ移行する際は NEXT_PUBLIC_BASE_PATH を空にすればよい。
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    // 静的エクスポートでは Next.js の画像最適化サーバーを使えないため無効化する
    unoptimized: true,
  },
};

export default nextConfig;
