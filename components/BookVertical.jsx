"use client";

import { useRef, useState } from "react";
import { asset } from "@/lib/asset";
import styles from "./BookVertical.module.css";

export default function BookVertical({ directory, pageCount, title, bookUrl }) {
  const viewport = useRef(null);
  const start = useRef(null);
  const [page, setPage] = useState(1);
  const numbers = Array.from({ length: pageCount }, (_, i) => i + 1);
  function go(next) {
    const el = viewport.current;
    const target = el.children[Math.max(0, Math.min(pageCount - 1, next - 1))];
    el.scrollTo({ top: target.offsetTop, behavior: "smooth" });
  }
  function track() {
    const el = viewport.current;
    const middle = el.scrollTop + el.clientHeight / 2;
    const index = Array.from(el.children).findIndex(child => child.offsetTop + child.offsetHeight > middle);
    setPage(index < 0 ? pageCount : index + 1);
  }
  return <div className={styles.reader} data-book-vertical>
    <div ref={viewport} className={styles.viewport} onScroll={track} tabIndex={0}
      role="region" aria-label={`${title}。上下にスクロールして読む作品集`}>
      {numbers.map(n => <a key={n} className={styles.page}
        href={`${bookUrl.split("#")[0]}#p=${n}`} aria-label={`${title} ${n}ページを作品集で読む`}
        onPointerDown={event => { start.current = { x: event.clientX, y: event.clientY }; }}
        onClick={event => { if (event.detail && start.current && Math.hypot(event.clientX - start.current.x, event.clientY - start.current.y) > 10) event.preventDefault(); }}>
        <img src={asset(`${directory}/${String(n).padStart(3, "0")}.webp`)}
          alt={`${title} ${n}ページ`} width={1980} height={2800} loading={n === 1 ? "eager" : "lazy"} draggable={false} />
      </a>)}
    </div>
    <div className={styles.controls}>
      <button type="button" aria-label="前のページ" disabled={page === 1} onClick={() => go(page - 1)}>↑</button>
      <label>ページ <select aria-label="表示するページ" value={page} onChange={event => go(Number(event.target.value))}>
        {numbers.map(n => <option key={n} value={n}>{n} / {pageCount}</option>)}
      </select></label>
      <button type="button" aria-label="次のページ" disabled={page === pageCount} onClick={() => go(page + 1)}>↓</button>
    </div>
    <p className={styles.guide}>上下にスクロールして読む</p>
  </div>;
}
