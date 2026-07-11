import "./globals.css";
import { Syne, Zen_Kaku_Gothic_New } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundUzu from "@/components/BackgroundUzu";

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
export const metadata = {
  title: {
    default: "ART NO UZU — 神谷佳美 公式サイト",
    template: "%s — ART NO UZU",
  },
  description:
    "神谷佳美（Kamitani Yoshimi）公式サイト。2014年より渦だけを描き続けるアーティストの作品（Works / Exhibition）・展示記録・プロフィール。渦は、感情であり、呼吸であり、記録であり、祈り。",
  openGraph: {
    title: "ART NO UZU — 神谷佳美 公式サイト",
    description:
      "渦は、感情であり、呼吸であり、記録であり、祈り。神谷佳美の作品アーカイブ。",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport = {
  themeColor: "#f5f4f2",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja" className={`${syne.variable} ${zen.variable}`}>
      <body className="min-h-screen flex flex-col">
        <BackgroundUzu />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
