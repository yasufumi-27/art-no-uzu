"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { placeholder } from "@/lib/placeholder";
import { works } from "@/lib/works";

// index の Works / Exhibition。訪問ごとにランダムで9作品を選ぶ（#3）。
// SSR ではハイドレーション不一致を避けるため決定的に先頭9件を描画し、
// マウント後にクライアント側でシャッフルして差し替える。
function pickRandom(list, n) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

export default function FeaturedWorks() {
  const [items, setItems] = useState(() => works.slice(0, 9));

  useEffect(() => {
    setItems(pickRandom(works, 9));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
      {items.map((work, i) => {
        const inner = (
          <div className="relative aspect-square overflow-hidden bg-[var(--color-line)]">
            <img
              src={placeholder(work.id, 1)}
              alt={work.title}
              loading="lazy"
              className="zoom-img h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/55 to-transparent p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <p className="text-[9px] tracking-[0.2em] text-white/70">
                {work.category}
              </p>
              <p className="text-[11px] tracking-wider-jp text-white line-clamp-1">
                {work.title}
              </p>
            </div>
          </div>
        );
        return (
          <Reveal key={work.id} delay={(i % 3) * 0.08}>
            {/* 作品ページあり→詳細へ、なし→Instagram へ（#1） */}
            {work.hasDetail ? (
              <Link href={`/works/${work.id}`} className="group block">
                {inner}
              </Link>
            ) : (
              <a
                href={work.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                {inner}
              </a>
            )}
          </Reveal>
        );
      })}
    </div>
  );
}
