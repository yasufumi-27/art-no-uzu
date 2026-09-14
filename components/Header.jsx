import Link from "next/link";

// グローバルナビゲーション（仕様書 7）。ロゴクリックで TOP へ遷移。
const NAV = [
  { href: "/", label: "Home" },
  { href: "/works", label: "Works / Exhibition" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// 2026-09 クライアント回答：背景は白 100% で塗り、高さは従来の約 2/3、
// ロゴ（YOSHIMI KAMITANI）はメニュー文字より 1pt 大きく。追従（sticky）はそのまま。
export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-white">
      <div className="container-wide flex flex-col items-start justify-center gap-1 py-2 md:h-[75px] md:flex-row md:items-center md:justify-between md:gap-8 md:py-0">
        <Link
          href="/"
          aria-label="YOSHIMI KAMITANI — Home"
          className="text-[calc(13px+1pt)] md:text-[calc(0.875rem+1pt)] tracking-[0.18em] font-light leading-tight whitespace-nowrap"
        >
          {Array.from("Yoshimi Kamitani").map((ch, i) => (
            <span
              key={i}
              className="title-char"
              style={{ animationDelay: `${i * 0.09}s` }}
            >
              {ch}
            </span>
          ))}
        </Link>
        <nav>
          <ul className="flex items-center gap-5 md:gap-10 text-[13px] md:text-sm tracking-wider-jp text-[var(--color-ink)]">
            {NAV.map((item, i) => (
              <li
                key={item.href}
                className="anim-header-item whitespace-nowrap"
                style={{ animationDelay: `${0.15 + i * 0.12}s` }}
              >
                <Link
                  href={item.href}
                  className="nav-link transition-colors hover:text-[var(--color-ink)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
