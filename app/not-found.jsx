import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-main flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-sm tracking-wider-jp text-[var(--color-muted)]">404</p>
      <p className="mt-4 text-sm tracking-wider-jp">
        ページが見つかりませんでした
      </p>
      <Link
        href="/"
        className="mt-8 border-b border-[var(--color-ink)] pb-1 text-xs tracking-wider-jp hover:opacity-60"
      >
        TOP へ戻る →
      </Link>
    </div>
  );
}
