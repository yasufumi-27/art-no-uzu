"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import styles from "./BookSpread.module.css";

// Right-bound book: cover alone, then page 3 on the left / page 2 on the right.
export default function BookSpread({ directory, pageCount, title }) {
  const [spread, setSpread] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const dialog = useRef(null);
  const gesture = useRef(null);
  const suppressClick = useRef(false);
  const count = 1 + Math.ceil((pageCount - 1) / 2);
  const first = spread === 0 ? 1 : spread * 2;
  const pages = spread === 0 ? [1] : [first + 1, first].filter(n => n <= pageCount);
  const label = spread === 0 ? "表紙" : `${first}–${Math.min(first + 1, pageCount)} / ${pageCount}`;
  const go = delta => setSpread(value => Math.max(0, Math.min(count - 1, value + delta)));

  useEffect(() => {
    if (!expanded) return;
    const el = dialog.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    el.showModal();
    return () => { el.close(); document.body.style.overflow = overflow; };
  }, [expanded]);

  function images() {
    return pages.map(page => <img key={page} data-book-page={page}
      src={asset(`${directory}/${String(page).padStart(3, "0")}.webp`)}
      alt={`${title} ${page}ページ`} width="595" height="842" draggable={false} />);
  }

  function start(event) {
    if (!event.isPrimary || event.button !== 0) return;
    suppressClick.current = false;
    gesture.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function finish(event) {
    const from = gesture.current;
    gesture.current = null;
    if (!from) return;
    const dx = event.clientX - from.x, dy = event.clientY - from.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      suppressClick.current = true;
      go(dx > 0 ? 1 : -1);
    }
  }

  return <div className={styles.reader} data-book-reader>
    <button type="button" className={`${styles.spread} ${pages.length === 1 ? styles.single : ""}`}
      aria-label={`${title} ${label}を拡大する`}
      onPointerDown={start} onPointerUp={finish}
      onPointerCancel={() => { gesture.current = null; }}
      onDragStart={event => event.preventDefault()}
      onClick={event => { if (event.detail === 0 || !suppressClick.current) { setZoomed(false); setExpanded(true); } }}>
      {images()}
    </button>
    <div className={styles.controls}>
      <button type="button" onClick={() => go(1)} disabled={spread === count - 1} aria-label="次の見開き">←</button>
      <label className={styles.jump}>ページ
        <select aria-label="表示する見開き" value={spread} onChange={event => setSpread(Number(event.target.value))}>
          {Array.from({ length: count }, (_, n) => <option key={n} value={n}>{n === 0 ? "表紙" : `${n * 2}–${Math.min(n * 2 + 1, pageCount)}`}</option>)}
        </select>
      </label>
      <button type="button" onClick={() => go(-1)} disabled={spread === 0} aria-label="前の見開き">→</button>
    </div>
    <p className={styles.guide}>左右にスワイプして読む · 見開きに触れると拡大</p>
    <span className={styles.status} aria-live="polite">{label}</span>
    <dialog ref={dialog} className={styles.dialog} onClose={() => setExpanded(false)}
      onCancel={() => setExpanded(false)} aria-label={`${title} 見開きの拡大表示`}
      onClick={event => { if (event.target === event.currentTarget) setExpanded(false); }}>
      <div className={styles.dialogTools}>
        <button type="button" onClick={() => setZoomed(value => !value)}>{zoomed ? "全体を表示" : "さらに拡大"}</button>
        <button type="button" onClick={() => setExpanded(false)} autoFocus>閉じる ×</button>
      </div>
      <div className={styles.zoomViewport} tabIndex={0} aria-label="拡大した作品集。スクロールして閲覧できます。">
        <div className={`${styles.zoomSpread} ${zoomed ? styles.zoomed : ""} ${pages.length === 1 ? styles.single : ""}`}>
          {images()}
        </div>
      </div>
    </dialog>
  </div>;
}
