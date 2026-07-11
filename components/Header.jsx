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
          className="font-display text-xl md:text-3xl tracking-[0.18em] font-semibold"
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
