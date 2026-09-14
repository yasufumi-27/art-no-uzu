"use client";

import { useEffect, useState } from "react";
import Spiral from "@/components/Spiral";
import { asset } from "@/lib/asset";
import { SOCIAL } from "@/components/Footer";
import { works } from "@/lib/works";
import { COMING_SOON_IMAGES } from "@/lib/coming-soon";

// Coming Soon（2027年）。
// ・花のマーク画像（クライアント提供ロゴ）が、渦の誕生に合わせて生まれては消えるアニメーション
// ・クリックでポップアップを開き、作品画像をランダムにスライドショー表示
//   （ポップアップ用の画像は後日受領予定。lib/coming-soon.js が空のあいだは解像度の高い作品画像で代用）
// ・公式LINEのリンクはポップアップ内ではなく常設で置く
const LINE = SOCIAL.find((s) => s.label === "LINE")?.href;
const INTERVAL = 3200;

function shuffled(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sourceImages() {
  if (COMING_SOON_IMAGES.length) return COMING_SOON_IMAGES.map((src) => asset(src));
  return works.filter((w) => w.sharp).map((w) => w.images[0]);
}

export default function ComingSoon({ year }) {
  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);

  const openShow = () => {
    setSlides(shuffled(sourceImages()));
    setIndex(0);
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const timer = setInterval(() => setIndex((i) => i + 1), INTERVAL);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearInterval(timer);
    };
  }, [open]);

  // 表示中の前後だけ描画して、読み込みを最小限にする
  const n = slides.length;
  const visible = n ? [index - 1, index, index + 1].map((i) => ((i % n) + n) % n) : [];
  const current = n ? index % n : 0;

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={openShow}
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
            {year} — 新たな渦が、生まれる。
          </span>
        </span>
      </button>

      {/* 公式LINE（常設） */}
      {LINE && (
        <div className="mt-2 text-center">
          <p className="text-xs leading-loose tracking-wider-jp text-[var(--color-muted)]">
            作品の公開や最新情報は、公式LINEでお知らせします。
          </p>
          <a
            href={LINE}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block border border-[var(--color-ink)] px-10 py-3 text-xs tracking-wider-jp transition-colors hover:bg-[var(--color-ink)] hover:text-white"
          >
            LINE で友だち追加 ↗
          </a>
        </div>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${year} Coming Soon`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="cs-popup relative h-[min(80vh,860px)] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {visible.map((i) => (
              <img
                key={`${i}-${slides[i]}`}
                src={slides[i]}
                alt=""
                className={`cs-slide absolute inset-0 h-full w-full object-contain transition-opacity duration-[1400ms] ease-in-out ${
                  i === current ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <p className="absolute -bottom-9 left-0 right-0 text-center font-display text-xs tracking-[0.4em] text-white/70">
              {year} Coming Soon
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="閉じる"
              className="absolute -top-10 right-0 text-2xl text-white/80 hover:text-white"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
