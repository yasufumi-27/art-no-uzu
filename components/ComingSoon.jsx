"use client";

import { useEffect, useState } from "react";
import Spiral from "@/components/Spiral";
import { asset } from "@/lib/asset";
import { SOCIAL } from "@/components/Footer";

// Coming Soon（2027年）。打ち合わせメモ：画像を使ってアニメーションし、クリックでポップアップ。ポップアップに LINE のリンクを出す。
// 画像はクライアント提供ロゴの花のマーク（渦を抱いた花）。渦が描かれるのに合わせて花が生まれ、消えてまた生まれる。
const LINE = SOCIAL.find((s) => s.label === "LINE")?.href;

export default function ComingSoon({ year }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="group relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden md:aspect-[16/7]"
      >
        <span className="pointer-events-none absolute left-1/2 top-1/2 h-[min(70vw,420px)] w-[min(70vw,420px)] -translate-x-1/2 -translate-y-1/2 text-[var(--color-line)]">
          <Spiral turns={5} strokeWidth={0.8} className="uzu-birth h-full w-full" pathClassName="uzu-birth-draw" />
        </span>
        <span className="relative flex flex-col items-center">
          <img
            src={asset("/images/logo/mark.png")}
            alt=""
            aria-hidden="true"
            className="cs-image h-40 w-auto md:h-56"
          />
          <span className="mt-6 font-display text-lg tracking-[0.5em] text-[var(--color-ink)] md:text-2xl">
            Coming Soon
          </span>
          <span className="mt-3 text-[11px] tracking-wider-jp text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-ink)]">
            {year} — 新たな渦が、生まれる。（クリック）
          </span>
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${year} Coming Soon`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="cs-popup relative w-full max-w-sm bg-white px-8 py-12 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="閉じる"
              className="absolute right-4 top-3 text-lg text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            >
              ×
            </button>
            <img
              src={asset("/images/logo/mark.png")}
              alt=""
              aria-hidden="true"
              className="mx-auto h-24 w-auto"
            />
            <p className="mt-6 font-display text-sm tracking-[0.4em]">{year} Coming Soon</p>
            <p className="mt-4 text-xs leading-loose tracking-wider-jp text-[var(--color-muted)]">
              新たな渦が、生まれる。
              <br />
              作品の公開や最新情報は、公式LINEでお知らせします。
            </p>
            {LINE && (
              <a
                href={LINE}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block border border-[var(--color-ink)] px-10 py-3 text-xs tracking-wider-jp transition-colors hover:bg-[var(--color-ink)] hover:text-white"
              >
                LINE で友だち追加 ↗
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}
