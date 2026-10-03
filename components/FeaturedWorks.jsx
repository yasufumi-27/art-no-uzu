"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import FadeImg from "@/components/FadeImg";
import InstagramBadge from "@/components/InstagramBadge";
import Spiral from "@/components/Spiral";
import { works, workAlt } from "@/lib/works";
import { TOP_IMAGES } from "@/lib/top-images";
import { SAME_IMAGE_GROUPS } from "@/lib/work-links";

// index の Works / Exhibition。訪問ごとにランダムで9作品を選ぶ（#3）。
// 大きく拡大表示するため、解像度の高い作品（works.sharp）だけから選ぶ。
// SSR ではハイドレーション不一致を避けるため決定的に先頭9件を描画し、
// マウント後にクライアント側でシャッフルして差し替える。
// 同じ画像の作品（SAME_IMAGE_GROUPS）は、指定した show の作品だけを残し、hide の作品は TOP に出さない
const HIDDEN_ON_TOP = new Set(SAME_IMAGE_GROUPS.flatMap((g) => g.hide));
function uniqueImages(list) {
  return list.filter((w) => !HIDDEN_ON_TOP.has(w.id));
}

function pickRandom(list, n) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return uniqueImages(a).slice(0, n);
}

const SHARP_WORKS = works.filter((w) => w.sharp);
function chooseTiles(random = false) {
  const top = random ? pickRandom(TOP_IMAGES, 5) : TOP_IMAGES.slice(0, 5);
  const sides = random ? pickRandom(SHARP_WORKS, 4) : uniqueImages(SHARP_WORKS).slice(0, 4);
  return [top[0], sides[0], top[1], sides[1], top[2], sides[2], top[3], sides[3], top[4]];
}

export default function FeaturedWorks() {
  const [items, setItems] = useState(() => chooseTiles());
  const gridRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [intro, setIntro] = useState(() => TOP_IMAGES.slice(0, 3));
  const storyRef = useRef(null);
  const dialogRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const openMobile = (event, work) => {
    if (!window.matchMedia("(max-width: 639px), (hover: none)").matches) return;
    event.preventDefault();
    setSelected(work);
    dialogRef.current.showModal();
  };

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
    setIntro(pickRandom(TOP_IMAGES, 3));
  }, []);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!storyRef.current) return;
      const r = storyRef.current.getBoundingClientRect();
      setProgress(Math.max(0, Math.min(1, -r.top / Math.max(1, r.height - window.innerHeight))));
    };
    const scroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    return () => { window.removeEventListener("scroll", scroll); window.removeEventListener("resize", scroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
    <div ref={storyRef} className="featured-story">
      <div className="featured-story-stage">
        <p className="featured-story-title" style={{ opacity: progress < 0.18 ? 1 : 0 }}>Works / Exhibition</p>
        <div className="featured-story-spiral" style={{ opacity: progress >= 0.12 && progress < 0.48 ? 1 : 0 }}>
          <Spiral turns={5} strokeWidth={0.8} className="h-full w-full" pathClassName="scroll-spiral" />
          <style>{`.scroll-spiral { stroke-dasharray: 1; stroke-dashoffset: ${1 - Math.min(1, Math.max(0, (progress - 0.12) / 0.3))}; }`}</style>
        </div>
        {intro.map((work, i) => (
          <button key={work.id} className="featured-story-image" aria-label="作品を拡大" tabIndex={progress >= 0.45 + i * 0.17 && progress < 0.62 + i * 0.17 ? 0 : -1}
            style={{ opacity: progress >= 0.45 + i * 0.17 && progress < 0.62 + i * 0.17 ? 1 : 0, pointerEvents: progress >= 0.45 + i * 0.17 && progress < 0.62 + i * 0.17 ? "auto" : "none" }}
            onClick={(e) => openMobile(e, work)}>
            <img src={work.images[0]} alt="神谷佳美 作品" />
          </button>
        ))}
      </div>
    </div>
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
                onClick={(e) => openMobile(e, work)}
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
                onClick={(e) => openMobile(e, work)}
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
    <dialog ref={dialogRef} className="work-dialog" onClick={(e) => { if (e.target === e.currentTarget) e.currentTarget.close(); }} onClose={() => setSelected(null)}>
      {selected && <div className="relative">
        <button className="work-dialog-close" onClick={() => dialogRef.current.close()} aria-label="閉じる">×</button>
        <img src={selected.images[0]} alt={workAlt(selected)} className="work-dialog-image" />
        <p className="mt-4 text-sm">{selected.title || selected.year || "Works / Exhibition"}</p>
        {selected.hasDetail ? <Link className="mt-4 inline-block border-b text-xs" href={selected.href || `/works/${selected.id}`}>詳しく見る →</Link> : <a className="mt-4 inline-block border-b text-xs" href={selected.instagram} target="_blank" rel="noopener noreferrer">{selected.linkLabel} で見る ↗</a>}
      </div>}
    </dialog>
    </>
  );
}
