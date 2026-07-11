import Link from "next/link";

// グローバルナビゲーション（仕様書 7）。ロゴクリックで TOP へ遷移。
const NAV = [
  { href: "/works", label: "Works / Exhibition" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-[var(--color-bg)]/50 backdrop-blur-md">
      <div className="container-wide flex items-center justify-between h-16 md:h-20">
        <Link
          href="/"
          className="anim-header-item font-display text-sm md:text-base tracking-[0.28em] font-semibold"
        >
          ART NO UZU
        </Link>
        <nav>
          <ul className="flex items-center gap-5 md:gap-10 text-[13px] md:text-sm tracking-wider-jp text-[var(--color-muted)]">
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
