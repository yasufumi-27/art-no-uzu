"use client";

import { useEffect, useRef, useState } from "react";
import Spiral from "@/components/Spiral";
import { asset } from "@/lib/asset";
import { SOCIAL } from "@/components/Footer";
import { works } from "@/lib/works";
import { COMING_SOON_IMAGES } from "@/lib/coming-soon";

// Coming Soon（2027年）。
// ・中央：花のマーク画像（クライアント提供ロゴ）が、渦の誕生に合わせて生まれては消える
// ・Coming Soon 枠内のランダムな位置に、作品画像がロゴと同じくらいの大きさ・透明度60%でポップアップし続ける
//   （3秒かけてフェードイン → 4秒表示 → 2秒でフェードアウト。見た目は globals.css の .cs-pop）
//   ポップアップ用の画像は後日受領予定。lib/coming-soon.js が空のあいだは解像度の高い作品画像で代用
// ・公式LINEのリンクは常設
const LINE = SOCIAL.find((s) => s.label === "LINE")?.href;
const LIFETIME = 9000; // 3s 登場 + 4s 表示 + 2s フェードアウト（.cs-pop と合わせる）
const SPAWN_EVERY = 3000; // 同時に見えるのは3枚ほど

function sourceImages() {
  if (COMING_SOON_IMAGES.length) return COMING_SOON_IMAGES.map((src) => asset(src));
  return works.filter((w) => w.sharp).map((w) => w.thumb);
}

export default function ComingSoon({ year }) {
  const [pops, setPops] = useState([]);
  const seq = useRef(0);
  const images = useRef([]);

  const spawn = () => {
    const list = images.current;
    if (!list.length) return;
    const id = ++seq.current;
    const src = list[Math.floor(Math.random() * list.length)];
    // 位置は枠に対する割合。画像が枠からはみ出しにくい範囲でランダム
    const left = 12 + Math.random() * 76;
    const top = 18 + Math.random() * 64;
    setPops((p) => [...p, { id, src, left, top }]);
    setTimeout(() => setPops((p) => p.filter((q) => q.id !== id)), LIFETIME);
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    images.current = sourceImages();
    spawn();
    const timer = setInterval(() => spawn(), SPAWN_EVERY);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden sm:aspect-[16/9] md:aspect-[16/7]"
      >
        {/* 作品画像のポップアップ（ロゴの後ろ） */}
        {pops.map((p) => (
          <img
            key={p.id}
            src={p.src}
            alt=""
            aria-hidden="true"
            className="cs-pop pointer-events-none absolute h-40 w-auto max-w-[45%] object-contain md:h-56"
            style={{ left: `${p.left}%`, top: `${p.top}%` }}
          />
        ))}
        <span className="pointer-events-none absolute left-1/2 top-1/2 h-[min(70vw,420px)] w-[min(70vw,420px)] -translate-x-1/2 -translate-y-1/2 text-[var(--color-line)]">
          <Spiral turns={5} strokeWidth={0.8} className="uzu-birth h-full w-full" pathClassName="uzu-birth-draw" />
        </span>
        <span className="pointer-events-none relative flex flex-col items-center">
          <img
            src={asset("/images/logo/mark.png")}
            alt=""
            aria-hidden="true"
            className="cs-image h-40 w-auto md:h-56"
          />
          <span className="mt-6 font-display text-lg tracking-[0.5em] text-[var(--color-ink)] md:text-2xl">
            Coming Soon
          </span>
          <span className="mt-3 text-[11px] tracking-wider-jp text-[var(--color-muted)]">
            {year} — 新たな渦が、生まれる。
          </span>
        </span>
      </div>

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
    </div>
  );
}
