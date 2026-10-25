import Link from "next/link";
import { asset } from "@/lib/asset";

import SocialLinks from "@/components/SocialLinks";

export { SOCIAL } from "@/lib/social";

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-[var(--color-line)] py-16">
      <div className="container-main flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <img
            src={asset("/images/responsive/mark.webp")} width={228} height={400}
            alt=""
            aria-hidden="true"
            className="mb-4 h-16 w-auto opacity-80"
          />
          <p className="font-display text-sm tracking-[0.25em]">ART NO UZU</p>
          <p className="mt-2 text-[11px] tracking-wider-jp text-[var(--color-muted)]">
            神谷佳美
          </p>
          <p className="mt-3 text-xs text-[var(--color-muted)] leading-relaxed">
            画像・作品の無断転載および商用利用を禁止します。
            <br />
            外部リンク先の内容について当サイトは責任を負いません。
          </p>
        </div>
        <div className="flex flex-col gap-8 md:gap-4">
          <SocialLinks compact linkClassName="inline-block py-2 md:py-0" className="text-xs tracking-wide text-[var(--color-muted)]" />
          <div className="flex flex-wrap gap-8 md:gap-6 text-xs tracking-wider-jp text-[var(--color-muted)]">
            <Link href="/contact" className="hover:text-[var(--color-ink)]">
              Contact
            </Link>
            <Link href="/about" className="hover:text-[var(--color-ink)]">
              About
            </Link>
            <Link href="/privacy" className="hover:text-[var(--color-ink)]">
              Privacy Policy
            </Link>
          </div>
          <p className="text-[10px] text-[var(--color-muted)]">
            ©YOSHIMI KAMITANI
          </p>
        </div>
      </div>
    </footer>
  );
}
