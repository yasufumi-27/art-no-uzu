"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./PoetryInterlude.module.css";

export default function PoetryInterlude({ poems }) {
  const [index, setIndex] = useState(0);
  const figureRef = useRef(null);

  useEffect(() => {
    // Pick once per visit, before this section enters the viewport. Leave the
    // poem still while it is being read, and keep SSR/hydration deterministic.
    setIndex(Math.floor(Math.random() * poems.length));
    const figure = figureRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      figure.classList.add(styles.visible);
      observer.disconnect();
    }, { threshold: 0.12 });
    figure.classList.add(styles.waiting);
    observer.observe(figure);
    return () => observer.disconnect();
  }, [poems.length]);

  const poem = poems[index];
  return (
    <section className={styles.section} aria-label="作品の詩">
      <figure ref={figureRef} className={styles.figure}>
        <span className={styles.mark} aria-hidden="true">“</span>
        <blockquote className={styles.poem}>
          <p>{poem.text}</p>
        </blockquote>
        <figcaption className={styles.credit}>
          <Link href={`/works/${poem.id}`} aria-label={`「${poem.title}」の作品を見る`}>
            <cite>“{poem.title}”</cite>より
          </Link>
        </figcaption>
      </figure>
    </section>
  );
}
