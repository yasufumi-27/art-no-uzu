"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import FadeImg from "@/components/FadeImg";
import InstagramBadge from "@/components/InstagramBadge";
import Spiral from "@/components/Spiral";
import { works, workAlt } from "@/lib/works";
import { responsiveImage } from "@/lib/responsive-image";
import { TOP_IMAGES } from "@/lib/top-images";
import { SAME_IMAGE_GROUPS } from "@/lib/work-links";
import { chooseFeaturedTiles } from "@/lib/featured-selection";

// 四隅＋中央は固定5枚、残り4枚は重複しない鮮明な作品から選ぶ。
// SSR は決定的に選び、マウント後にランダム4枠だけを差し替える。
function chooseTiles(random = false) {
  return chooseFeaturedTiles(TOP_IMAGES, works, SAME_IMAGE_GROUPS, random ? Math.random : null);
}

export default function FeaturedWorks({ children }) {
  const [items, setItems] = useState(() => chooseTiles());
  const gridRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [scrollDriven, setScrollDriven] = useState(false);
  const storyRef = useRef(null);

  // ホバーした作品を拡大表示（打ち合わせメモ）：横は3列分、縦はその作品を中心に上下へ半段ずつ
  // （＝上の段の中央から下の段の中央まで）。一覧からはみ出す場合は高さを保ったまま内側へずらす。PCのみ。
  const showPreview = (el, work) => {
    const grid = gridRef.current;
    if (!grid || !window.matchMedia("(hover: hover) and (min-width: 640px)").matches) return;
    const g = grid.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const gap = parseFloat(getComputedStyle(grid).rowGap) || 0;
    const rowH = r.height + gap;
    const center = r.top - g.top + r.height / 2;
    let top = center - rowH;
    let bottom = center + rowH;
    if (top < 0) { bottom -= top; top = 0; }
    if (bottom > g.height) { top = Math.max(0, top - (bottom - g.height)); bottom = g.height; }
    // 拡大表示の中で、ホバーした作品のマスがどこにあるか（ここを起点に円が広がって画像が現れる）
    const ox = r.left - g.left + r.width / 2;
    const oy = center - top;
    setPreview({ work, top, height: bottom - top, ox, oy, size: r.width });
  };

  useEffect(() => {
    setItems(chooseTiles(true));
  }, []);

  useEffect(() => {
    let raf = 0;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      raf = 0;
      if (!storyRef.current) return;
      const enabled = !motion.matches;
      storyRef.current.classList.toggle("is-scroll-driven", enabled);
      setScrollDriven(enabled);
      if (!enabled) { setProgress(0); return; }
      const r = storyRef.current.getBoundingClientRect();
      const stage = storyRef.current.querySelector(".featured-story-stage");
      const top = parseFloat(getComputedStyle(stage).top) || 0;
      const range = r.height - stage.getBoundingClientRect().height;
      setProgress(Math.max(0, Math.min(1, (top - r.top) / Math.max(1, range))));
    };
    const scroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    motion.addEventListener("change", scroll);
    return () => {
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
      motion.removeEventListener("change", scroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
    <div ref={storyRef} className={`featured-story${scrollDriven ? " is-scroll-driven" : ""}`}>
      <div className="featured-story-stage">
        <div className="featured-story-decoration" aria-hidden="true">
          <Spiral turns={4} strokeWidth={0.5} className="h-full w-full" pathClassName="featured-story-ink" />
          <style>{`.featured-story-ink { stroke-dasharray: 1; stroke-dashoffset: ${1 - progress}; }`}</style>
        </div>
        <div className="featured-story-track" style={{ transform: scrollDriven ? `translateX(${-progress * (TOP_IMAGES.length - 1) * 100}%)` : "none" }}>
          {TOP_IMAGES.map((work, i) => {
            const active = !scrollDriven || i === Math.round(progress * (TOP_IMAGES.length - 1));
            const offset = scrollDriven ? Math.max(-1, Math.min(1, i - progress * (TOP_IMAGES.length - 1))) : 0;
            return (
              <Link key={work.id} href={work.href || `/works/${work.id}`} className="featured-story-image" aria-label={`作品 ${i + 1} / ${TOP_IMAGES.length} を見る`}
                aria-hidden={!active} tabIndex={active ? 0 : -1}>
                <span className="featured-story-artwork" style={{
                  transform: `perspective(900px) translateY(${Math.abs(offset) * 28}px) rotateY(${-offset * 18}deg) rotateZ(${offset * 3}deg) scale(${1 - Math.abs(offset) * 0.14})`,
                  opacity: 1 - Math.abs(offset) * 0.22,
                }}>
                  <img src={work.images[0]} {...responsiveImage(work.images[0])} decoding="async" alt={`神谷佳美 TOP指定作品 ${i + 1}`} loading="lazy" />
                </span>
              </Link>
            );
          })}
        </div>
        <p className="featured-story-count" aria-hidden="true">{String(Math.round(progress * (TOP_IMAGES.length - 1)) + 1).padStart(2, "0")} / 05</p>
      </div>
    </div>
    {children}
    <div
      ref={gridRef}
      className="featured-grid relative grid grid-cols-3 gap-1 sm:gap-4 md:gap-6"
      onMouseLeave={() => setPreview(null)}
    >
      {items.map((work, i) => {
        const inner = (
          <div className="zoom-card relative aspect-square overflow-hidden bg-[var(--color-line)]">
            <FadeImg
              src={work.thumb}
              sizes="33vw"
              alt={work.title || (work.year ? workAlt(work) : "神谷佳美 作品")}
              className="h-full w-full object-cover"
            />
            {!work.hasDetail && <InstagramBadge label={work.linkLabel} small />}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/55 to-transparent p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <p className="text-[0.5625rem] tracking-[0.2em] text-white/70">
                {work.category}
              </p>
              <p className="text-[0.6875rem] tracking-wider-jp text-white line-clamp-1">
                {work.title || work.year}
              </p>
            </div>
          </div>
        );
        return (
          <Reveal key={work.id} delay={(i % 3) * 0.08}>
            {/* 作品ページあり→詳細へ、なし→Instagram へ（#1） */}
            {work.hasDetail ? (
              <Link
                href={work.href || `/works/${work.id}`}
                className="group block"
                onMouseEnter={(e) => showPreview(e.currentTarget, work)}
              >
                {inner}
              </Link>
            ) : (
              <a
                href={work.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
                onMouseEnter={(e) => showPreview(e.currentTarget, work)}
              >
                {inner}
              </a>
            )}
          </Reveal>
        );
      })}
      {preview && (
        <div
          key={preview.work.id}
          className="pointer-events-none absolute left-0 z-30 w-full"
          style={{
            top: preview.top,
            height: preview.height,
            "--ox": `${preview.ox}px`,
            "--oy": `${preview.oy}px`,
            "--r0": `${preview.size * 0.5}px`,
          }}
        >
          {/* ホバーしたマスから、渦がひと巻き描かれ、その中心から円が広がって作品が現れる */}
          <div className="preview-iris absolute inset-0 overflow-hidden bg-[var(--color-bg)] shadow-[0_10px_40px_rgba(0,0,0,0.12)]">
            <img
              src={preview.work.images[0]}
              alt=""
              className="preview-iris-img h-full w-full object-contain p-3"
            />
            <span className="preview-caption absolute bottom-3 right-3 bg-black/70 px-2 py-1 text-[0.625rem] tracking-wider-jp text-white">
              {preview.work.title || preview.work.year} · {preview.work.linkLabel} ↗
            </span>
          </div>
          <span
            className="preview-spiral absolute text-[var(--color-ink)]"
            style={{
              left: preview.ox - preview.size * 0.6,
              top: preview.oy - preview.size * 0.6,
              width: preview.size * 1.2,
              height: preview.size * 1.2,
            }}
          >
            <Spiral turns={3} strokeWidth={1.2} className="h-full w-full" pathClassName="preview-spiral-path" />
          </span>
        </div>
      )}
    </div>
    </>
  );
}
