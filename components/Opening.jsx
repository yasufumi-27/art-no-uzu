"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { detailWorks } from "@/lib/works";
import { placeholder } from "@/lib/placeholder";

// 初期表示のオープニング画面（塩田千春サイト参考）。
// 作品スライドを背景に流しつつ、「Home」ボタンでホーム（既存 index）へ、
// 各リンクは丸いアイコンで提示する。once-per-session でホーム到達後は再表示しない。

const SLIDES = detailWorks();

// 丸アイコンで提示するリンク。Home はオーバーレイを閉じてホームへ、
// それ以外は各ページへ遷移する（遷移によりオーバーレイは自然に消える）。
const LINKS = [
  { href: "/", label: "Home", isHome: true },
  { href: "/works", label: "Works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const SEEN_KEY = "uzu-opening-seen";

export default function Opening() {
  const [open, setOpen] = useState(true);
  const [closing, setClosing] = useState(false);
  const [slide, setSlide] = useState(0);

  // 同一セッションで一度ホームへ入ったら再表示しない
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem(SEEN_KEY)) {
      setOpen(false);
    }
  }, []);

  // スライド自動送り
  useEffect(() => {
    if (!open) return;
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % SLIDES.length);
    }, 3600);
    return () => clearInterval(id);
  }, [open]);

  function enterHome() {
    if (typeof window !== "undefined") sessionStorage.setItem(SEEN_KEY, "1");
    setClosing(true);
    // フェードアウト後にアンマウント
    setTimeout(() => setOpen(false), 700);
  }

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden bg-[var(--color-bg)] transition-opacity duration-700 ${
        closing ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-label="オープニング"
    >
      {/* 作品スライド（クロスフェード） */}
      <div className="absolute inset-0">
        {SLIDES.map((work, i) => (
          <img
            key={work.id}
            src={placeholder(work.id, 16 / 10)}
            alt={work.title}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ease-in-out ${
              i === slide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* 文字の可読性を保つスクリム */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/55" />
      </div>

      {/* 前景コンテンツ */}
      <div className="relative flex h-full flex-col items-center justify-between px-6 py-10 text-white md:py-14">
        {/* タイトル */}
        <div className="text-center">
          <p className="font-display text-2xl tracking-[0.2em] md:text-4xl">
            ART NO UZU
          </p>
          <p className="mt-3 text-xs tracking-[0.35em] text-white/80 md:text-sm">
            YOSHIMI KAMITANI
          </p>
        </div>

        {/* 現在のスライドのタイトル */}
        <p className="text-center text-sm tracking-wider-jp text-white/90 md:text-base">
          {SLIDES[slide]?.title}
          <span className="mt-1 block text-xs text-white/60">
            {SLIDES[slide]?.year}
          </span>
        </p>

        {/* Home ボタン ＋ 各リンクの丸アイコン */}
        <div className="flex flex-col items-center gap-8">
          <button
            type="button"
            onClick={enterHome}
            className="rounded-full border border-white/70 px-10 py-3 text-sm tracking-[0.3em] text-white transition-colors duration-500 hover:bg-white hover:text-black"
          >
            Home
          </button>

          <nav aria-label="オープニングのリンク">
            <ul className="flex items-center gap-5 md:gap-7">
              {LINKS.map((link) => {
                const circle =
                  "flex h-16 w-16 items-center justify-center rounded-full border border-white/60 text-[0.7rem] tracking-wider text-white/90 transition-colors duration-500 hover:bg-white hover:text-black md:h-20 md:w-20 md:text-xs";
                return (
                  <li key={link.label}>
                    {link.isHome ? (
                      <button
                        type="button"
                        onClick={enterHome}
                        className={circle}
                        aria-label="ホームへ"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link href={link.href} className={circle}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
