import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// SEO / メタ情報（仕様書 17）。OGP 対応。
export const metadata = {
  title: {
    default: "ART NO UZU — Artist Official Site",
    template: "%s — ART NO UZU",
  },
  description:
    "画家の公式ポートフォリオサイト。作品（Works / Exhibition）の閲覧、展示記録、アーティスト情報を静けさと余白を重視したミニマルなUIで紹介します。",
  openGraph: {
    title: "ART NO UZU — Artist Official Site",
    description:
      "作品を主役にしたミニマルなアーティスト公式ポートフォリオ。Works / Exhibition のアーカイブ。",
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
    <html lang="ja">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
