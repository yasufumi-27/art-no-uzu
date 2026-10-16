"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./PoetryInterlude.module.css";

export default function PoetryInterlude({ poems }) {
  const [position, setPosition] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [inView, setInView] = useState(false);
  const viewportRef = useRef(null);
  const strideRef = useRef(1);
  const indexRef = useRef(0);
  const dragRef = useRef(null);
  const suppressClick = useRef(false);
  const index = Math.max(0, Math.min(poems.length - 1, Math.round(position)));

  useEffect(() => {
    const viewport = viewportRef.current;
    const measure = () => {
      const figures = viewport.querySelectorAll("[data-poem-id]");
      strideRef.current = figures.length > 1
        ? figures[1].offsetLeft - figures[0].offsetLeft
        : figures[0]?.offsetWidth || 1;
      viewport.scrollLeft = indexRef.current * strideRef.current;
    };
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    const visibility = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .1 });
    visibility.observe(viewport);
    measure();
    return () => { observer.disconnect(); visibility.disconnect(); };
  }, []);

  function trackScroll(event) {
    const next = event.currentTarget.scrollLeft / strideRef.current;
    indexRef.current = Math.max(0, Math.min(poems.length - 1, Math.round(next)));
    setPosition(next);
  }

  function startDrag(event) {
    suppressClick.current = false;
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    dragRef.current = { x: event.clientX, scroll: event.currentTarget.scrollLeft, moved: false };
  }

  function drag(event) {
    const gesture = dragRef.current;
    if (!gesture) return;
    if (event.buttons !== 1) { endDrag(event); return; }
    const distance = event.clientX - gesture.x;
    if (!gesture.moved && Math.abs(distance) < 8) return;
    if (!gesture.moved) {
      gesture.moved = true;
      suppressClick.current = true;
      setDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
      event.currentTarget.style.scrollSnapType = "none";
    }
    event.preventDefault();
    event.currentTarget.scrollLeft = gesture.scroll - distance;
  }

  function endDrag(event) {
    const gesture = dragRef.current;
    dragRef.current = null;
    if (!gesture?.moved) return;
    setDragging(false);
    const viewport = event.currentTarget;
    if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    viewport.style.scrollSnapType = "";
    viewport.scrollTo({ left: Math.round(viewport.scrollLeft / strideRef.current) * strideRef.current,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <section className={styles.section} aria-label="作品の詩" data-visible={inView}>
      <div className={styles.galleryLabel} aria-hidden="true">POETRY<span>言葉の余白</span></div>
      <div ref={viewportRef} className={styles.viewport} data-dragging={dragging}
        role="region" aria-label="詩のギャラリー。横スクロールで作品をめぐる" tabIndex={0}
        onScroll={trackScroll} onPointerDown={startDrag} onPointerMove={drag}
        onPointerUp={endDrag} onPointerCancel={endDrag}
        onDragStart={event => event.preventDefault()}
        onClickCapture={event => {
          if (suppressClick.current && event.detail > 0) { event.preventDefault(); event.stopPropagation(); }
        }}
        onKeyDown={event => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            const next = Math.max(0, Math.min(poems.length - 1, index + (event.key === "ArrowRight" ? 1 : -1)));
            event.currentTarget.scrollTo({ left: next * strideRef.current,
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
          }
        }}>
        <div className={styles.slides}>
          {poems.map((poem, i) => {
            const distance = Math.max(-2, Math.min(2, i - position));
            return (
              <article key={poem.id} className={`${styles.figure} ${i === index ? styles.active : ""}`}
                data-poem-id={poem.id} aria-label={`${i + 1} / ${poems.length}：${poem.title}`}
                style={{ "--distance": distance, "--depth": Math.abs(distance) }}>
                <figure className={styles.floatingBody}>
                  <span className={styles.exhibitNumber} aria-hidden="true">{String(i + 1).padStart(2, "0")} / WORDS</span>
                  <span className={styles.mark} aria-hidden="true">“</span>
                  <blockquote className={styles.poem}>
                    <Link className={styles.poemLink} href={`/works/${poem.id}`}
                      aria-label={`「${poem.title}」の詩 — 作品ページへ`}>
                      <p>{Array.from(poem.text).map((character, n, characters) => character === "\n" ? "\n" : (
                        <span key={n} className={styles.character} style={{ "--arrival": `${n / characters.length * 350}ms` }}>{character}</span>
                      ))}</p>
                    </Link>
                  </blockquote>
                  <span className={styles.closingMark} aria-hidden="true">”</span>
                  <figcaption className={styles.credit}>
                    <Link href={`/works/${poem.id}`} aria-label={`「${poem.title}」の作品を見る`}>
                      <cite>“{poem.title}”</cite>より
                    </Link>
                  </figcaption>
                </figure>
              </article>
            );
          })}
        </div>
      </div>
      <p className={styles.guide}>横にスクロールしてめぐる · 詩に触れると、作品へ。</p>
    </section>
  );
}
