"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./PoetryInterlude.module.css";

export default function PoetryInterlude({ poems }) {
  const [position, setPosition] = useState(0);
  const index = ((position % poems.length) + poems.length) % poems.length;
  const [phase, setPhase] = useState("enter");
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
    }, { threshold: 0.12 });
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
    // A complete cycle takes 13–16 seconds, including arrival and departure.
    const readingTime = Math.min(11000, Math.max(7500, poems[index].text.length * 65));
    const duration = { enter: 4000, hold: readingTime, exit: 1200, gap: 150 }[phase];
    const timer = window.setTimeout(() => {
      if (phase === "gap") {
        setPosition(p => p + 1);
        setPhase("enter");
      } else {
        setPhase({ enter: "hold", hold: "exit", exit: "gap" }[phase]);
      }
    }, duration);
    return () => window.clearTimeout(timer);
  }, [phase, index, inView, pageVisible, paused, hovered, focused, poems]);

  function move(direction) {
    setPaused(false);
    setPosition(p => p + direction);
    setPhase("enter");
  }

  return (
    <section className={styles.section} aria-label="作品の詩" data-resting={!inView || !pageVisible || paused} data-phase={phase}>
      <div ref={stageRef} className={styles.stage}>
        <div className={styles.galleryLabel} aria-hidden="true">POETRY<span>言葉の余白</span></div>
        <div className={styles.viewport}>
        <div className={styles.slides} style={{ "--turn": `${-position * 360 / poems.length}deg` }}
          onPointerEnter={e => { if (e.pointerType === "mouse") setHovered(true); }}
          onPointerLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}>
          {poems.map((poem, i) => (
            <figure key={poem.id} className={`${styles.figure} ${i === index ? styles.active : ""}`}
              aria-hidden={i !== index} data-poem-id={poem.id}
              data-near={i === (index + 1) % poems.length || i === (index - 1 + poems.length) % poems.length}
              style={{ "--angle": `${i * 360 / poems.length}deg` }}>
              <span className={styles.exhibitNumber} aria-hidden="true">{String(i + 1).padStart(2, "0")} / WORDS</span>
              <span className={styles.mark} aria-hidden="true">“</span>
              <blockquote className={styles.poem}>
                <Link className={styles.poemLink} href={`/works/${poem.id}`} tabIndex={i === index ? 0 : -1}
                  aria-label={`「${poem.title}」の詩 — 作品ページへ`}>
                  <p>{Array.from(poem.text).map((character, position, characters) =>
                    character === "\n" ? "\n" : (
                      <span key={position} className={styles.character} style={{
                        "--arrival": `${position / Math.max(1, characters.length - 1) * 1000 + 1200}ms`,
                        "--departure": `${(characters.length - 1 - position) / Math.max(1, characters.length - 1) * 300}ms`,
                      }}>{character}</span>
                    )
                  )}</p>
                </Link>
              </blockquote>
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
        </div>
        <nav className={styles.controls} aria-label="詩の展示を移動" onKeyDown={event => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        move(event.key === "ArrowRight" ? 1 : -1);
      }
    }}>
          <button type="button" onClick={() => move(-1)} aria-label="前の詩へ">←</button>
          <span className={styles.counter} aria-live="polite" aria-atomic="true">{String(index + 1).padStart(2, "0")} <span>/ {String(poems.length).padStart(2, "0")}</span></span>
        <button type="button" className={styles.pause} onClick={() => setPaused(p => !p)}
          aria-label={paused ? "詩の自動切り替えを再開" : "詩の自動切り替えを一時停止"} aria-pressed={paused}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            {paused ? <path d="M4 2.5 9 6 4 9.5Z" fill="currentColor" /> : <path d="M4 2.5v7M8 2.5v7" stroke="currentColor" />}
          </svg>
        </button>
          <button type="button" onClick={() => move(1)} aria-label="次の詩へ">→</button>
        </nav>
        <p className={styles.guide}>詩に触れると、作品へ。</p>
      </div>
    </section>
  );
}
