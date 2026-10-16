"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./PoetryInterlude.module.css";

export default function PoetryInterlude({ poems }) {
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const stageRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting) stage.classList.add(styles.visible);
    }, { threshold: 0.12 });
    stage.classList.add(styles.waiting);
    observer.observe(stage);
    const visibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    visibility();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  useEffect(() => {
    if (!inView || !pageVisible || paused || hovered || focused || poems.length < 2) return;
    // Allow time to read the complete poem; longer passages stay a little longer.
    const duration = Math.max(20000, poems[index].text.length * 160);
    const timer = window.setTimeout(() => setIndex(i => (i + 1) % poems.length), duration);
    return () => window.clearTimeout(timer);
  }, [index, inView, pageVisible, paused, hovered, focused, poems]);

  return (
    <section className={styles.section} aria-label="作品の詩" data-resting={!inView || !pageVisible || paused}>
      <div className={styles.atmosphere} aria-hidden="true">
        <div className={styles.light} />
        <div className={styles.mist} />
        {Array.from({ length: 9 }, (_, i) => (
          <i key={i} className={styles.mote} style={{ "--n": i }} />
        ))}
      </div>
      <div ref={stageRef} className={styles.stage}>
        <div className={styles.prelude} aria-hidden="true"><span /><i /></div>
        <div className={styles.slides}
          onPointerEnter={e => { if (e.pointerType === "mouse") setHovered(true); }}
          onPointerLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}>
          {poems.map((poem, i) => (
            <figure key={poem.id} className={`${styles.figure} ${i === index ? styles.active : ""}`}
              aria-hidden={i !== index} data-poem-id={poem.id}>
              <span className={styles.mark} aria-hidden="true">“</span>
              <blockquote className={styles.poem}><p>{poem.text}</p></blockquote>
              <span className={styles.closingMark} aria-hidden="true">”</span>
              <figcaption className={styles.credit}>
                <Link href={`/works/${poem.id}`} tabIndex={i === index ? 0 : -1}
                  aria-label={`「${poem.title}」の作品を見る`}>
                  <cite>“{poem.title}”</cite>より
                </Link>
              </figcaption>
            </figure>
          ))}
        </div>
        <button type="button" className={styles.pause} onClick={() => setPaused(p => !p)}
          aria-label={paused ? "詩の自動切り替えを再開" : "詩の自動切り替えを一時停止"} aria-pressed={paused}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            {paused ? <path d="M4 2.5 9 6 4 9.5Z" fill="currentColor" /> : <path d="M4 2.5v7M8 2.5v7" stroke="currentColor" />}
          </svg>
        </button>
      </div>
    </section>
  );
}
