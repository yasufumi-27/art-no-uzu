import Link from "next/link";

// グローバルナビゲーション（仕様書 7）。ロゴクリックで TOP へ遷移。
const NAV = [
  { href: "/works", label: "Works / Exhibition" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-[var(--color-bg)]/40">
      <div className="container-wide flex items-center justify-between h-20 md:h-28">
        <Link
          href="/"
          aria-label="Yoshimi Kamitani — Home"
          className="header-legible font-display text-xl md:text-3xl tracking-[0.18em] font-semibold leading-tight"
        >
          {Array.from("Yoshimi").map((ch, i) => (
            <span
              key={`f-${i}`}
              className="title-char"
              style={{ animationDelay: `${i * 0.09}s` }}
            >
              {ch}
            </span>
          ))}
          {/* スマホは改行、PC/iPad は半角スペース */}
          <br className="md:hidden" />
          <span className="hidden md:inline">{" "}</span>
          {Array.from("Kamitani").map((ch, i) => (
            <span
              key={`l-${i}`}
              className="title-char"
              style={{ animationDelay: `${(8 + i) * 0.09}s` }}
            >
              {ch}
            </span>
          ))}
        </Link>
        <nav>
          <ul className="header-legible flex items-center gap-5 md:gap-10 text-[13px] md:text-sm tracking-wider-jp text-[var(--color-ink)]">
            {NAV.map((item, i) => (
              <li
                key={item.href}
                className="anim-header-item"
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
