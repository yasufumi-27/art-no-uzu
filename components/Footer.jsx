import Link from "next/link";

// 外部SNS導線（仕様書 12.1）と著作権・免責（仕様書 20）。
export const SOCIAL = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
  { label: "TikTok", href: "https://www.tiktok.com/" },
  { label: "LINE", href: "https://line.me/" },
  { label: "BASE", href: "https://thebase.com/" },
];

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-[var(--color-line)] py-16">
      <div className="container-main flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm tracking-wider-jp">ART NO UZU</p>
          <p className="mt-3 text-xs text-[var(--color-muted)] leading-relaxed">
            画像・作品の無断転載および商用利用を禁止します。
            <br />
            外部リンク先の内容について当サイトは責任を負いません。
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs tracking-wider-jp text-[var(--color-muted)]">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[var(--color-ink)]"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex gap-6 text-xs tracking-wider-jp text-[var(--color-muted)]">
            <Link href="/contact" className="hover:text-[var(--color-ink)]">
              Contact
            </Link>
            <Link href="/about" className="hover:text-[var(--color-ink)]">
              About
            </Link>
          </div>
          <p className="text-[10px] text-[var(--color-muted)]">
            © {new Date().getFullYear()} ART NO UZU. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
