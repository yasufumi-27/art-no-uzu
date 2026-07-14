import "./globals.css";
import { Syne, Zen_Kaku_Gothic_New } from "next/font/google";
import Header from "@/components/Header";
import Footer, { SOCIAL } from "@/components/Footer";
import BackgroundUzu from "@/components/BackgroundUzu";
import {
  SITE_ORIGIN,
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  ARTIST_ID,
} from "@/lib/site";

// 見出し：Syne（現代的で少し近未来的なディスプレイ書体）
// 本文：Zen Kaku Gothic New（端正で余白の美しい和文ゴシック）
const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
const zen = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

// SEO / メタ情報（仕様書 17）。OGP 対応。
// metadataBase により OGP 画像・URL が絶対 URL で出力される
// （basePath は Next.js が自動付与するためオリジンのみを指定）。
export const metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: "ART NO UZU — 神谷佳美 公式サイト",
    template: "%s — ART NO UZU",
  },
  description: SITE_DESCRIPTION,
  // 著者・運営者の明示（E-E-A-T：コンテンツの責任主体を機械可読にする）
  authors: [{ name: "神谷佳美", url: SITE_URL }],
  creator: "神谷佳美",
  publisher: SITE_NAME,
  // 正規 URL（重複コンテンツ対策）。canonical には basePath が自動付与されないため、
  // 各ページで SITE_URL からの絶対 URL を明示する（ここはトップページ分）。
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  openGraph: {
    title: "ART NO UZU — 神谷佳美 公式サイト",
    description:
      "渦は、感情であり、呼吸であり、記録であり、祈り。神谷佳美の作品アーカイブ。",
    type: "website",
    siteName: SITE_NAME,
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
  },
};

// 構造化データ（仕様書 17 / E-E-A-T）。アーティストとサイトを @id で連結し、
// 経歴・受賞・公式SNS（sameAs）を機械可読にして専門性・権威性・信頼性を裏付ける。
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: "ja",
      publisher: { "@id": ARTIST_ID },
      copyrightHolder: { "@id": ARTIST_ID },
    },
    {
      "@type": "Person",
      "@id": ARTIST_ID,
      name: "神谷佳美",
      alternateName: ["Kamitani Yoshimi", "ART NO UZU"],
      jobTitle: "画家 / アーティスト",
      description:
        "1994年東京生まれ。2014年より、ただひとつのモチーフ「渦」を描き続けている。",
      url: SITE_URL,
      mainEntityOfPage: `${SITE_URL}/about/`,
      award:
        "インフルエンサー・アワード・ジャパン 2023 ENTERTAINMENT部門 最優秀賞",
      knowsAbout: ["絵画", "現代アート", "アクリル画", "ライブペインティング"],
      sameAs: SOCIAL.map((s) => s.href),
    },
  ],
};

export const viewport = {
  themeColor: "#f5f4f2",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja" className={`${syne.variable} ${zen.variable}`}>
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <BackgroundUzu />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
