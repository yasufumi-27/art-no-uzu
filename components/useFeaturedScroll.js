"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const clamp = value => Math.max(0, Math.min(1, value));

// 縦スクロールとネイティブな横操作を、同じスクロール位置へ同期する。
export default function useFeaturedScroll(count, onProgress) {
  const viewportRef = useRef(null);
  const vertical = useRef(0);
  const offset = useRef(0);
  const target = useRef(0);
  const position = useRef(0);
  const busyUntil = useRef(0);
  const gesture = useRef(null);
  const touching = useRef(false);
  const suppressClick = useRef(false);
  const settleTimer = useRef(null);
  const [dragging, setDragging] = useState(false);
  const range = () => {
    const el = viewportRef.current;
    return el ? Math.max(0, el.scrollWidth - el.clientWidth) : 0;
  };

  const syncVertical = useCallback(next => {
    if (next === null) return;
    vertical.current = next;
    if (touching.current || gesture.current?.moved || performance.now() < busyUntil.current) return;
    const progress = clamp(next + offset.current);
    offset.current = progress - next;
    position.current = progress;
    target.current = progress * range();
    if (viewportRef.current) viewportRef.current.scrollLeft = target.current;
    onProgress(progress);
  }, [onProgress]);

  function moveTo(index) {
    const el = viewportRef.current;
    if (!el) return;
    clearTimeout(settleTimer.current);
    busyUntil.current = performance.now() + 700;
    el.scrollTo({ left: Math.max(0, Math.min(count - 1, index)) * el.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  function settle() {
    clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      const el = viewportRef.current;
      if (!el || touching.current || gesture.current?.moved) return;
      const left = Math.round(el.scrollLeft / el.clientWidth) * el.clientWidth;
      if (Math.abs(left - el.scrollLeft) > 1) moveTo(Math.round(el.scrollLeft / el.clientWidth));
    }, 180);
  }

  function onScroll(event) {
    const el = event.currentTarget;
    const max = range();
    const next = max ? clamp(el.scrollLeft / max) : 0;
    position.current = next;
    onProgress(next);
    // 縦スクロールから設定した位置の通知では、手動の差分を書き換えない。
    if (Math.abs(el.scrollLeft - target.current) < 1) return;
    offset.current = next - vertical.current;
    busyUntil.current = performance.now() + 250;
    if (touching.current) suppressClick.current = true;
    settle();
  }

  function endDrag(event) {
    const current = gesture.current;
    gesture.current = null;
    if (current?.moved) {
      setDragging(false);
      if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    }
    settle();
  }

  useEffect(() => {
    const el = viewportRef.current;
    const observer = new ResizeObserver(() => {
      target.current = position.current * range();
      el.scrollLeft = target.current;
    });
    observer.observe(el);
    return () => { observer.disconnect(); clearTimeout(settleTimer.current); };
  }, []);

  return {
    viewportRef, syncVertical, dragging,
    previous: () => moveTo(Math.round(position.current * (count - 1)) - 1),
    next: () => moveTo(Math.round(position.current * (count - 1)) + 1),
    bindings: {
      onScroll,
      onPointerDown(event) {
        suppressClick.current = false;
        if (event.pointerType === "mouse" && event.button === 0) gesture.current = { x: event.clientX, left: event.currentTarget.scrollLeft, moved: false };
      },
      onPointerMove(event) {
        const current = gesture.current;
        if (!current) return;
        if (event.buttons !== 1) { endDrag(event); return; }
        const distance = event.clientX - current.x;
        if (!current.moved && Math.abs(distance) < 8) return;
        if (!current.moved) {
          current.moved = true;
          suppressClick.current = true;
          setDragging(true);
          event.currentTarget.setPointerCapture(event.pointerId);
        }
        event.preventDefault();
        busyUntil.current = performance.now() + 400;
        event.currentTarget.scrollLeft = current.left - distance;
      },
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onLostPointerCapture: endDrag,
      onTouchStart() { suppressClick.current = false; touching.current = true; clearTimeout(settleTimer.current); },
      onTouchEnd() { touching.current = false; settle(); },
      onTouchCancel() { touching.current = false; settle(); },
      onWheel(event) {
        if (Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey) busyUntil.current = performance.now() + 400;
      },
      onDragStart: event => event.preventDefault(),
      onClickCapture(event) {
        if (suppressClick.current && event.detail > 0) { event.preventDefault(); event.stopPropagation(); }
      },
      onKeyDown(event) {
        const index = Math.round(position.current * (count - 1));
        if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
          event.preventDefault();
          moveTo(event.key === "Home" ? 0 : event.key === "End" ? count - 1 : index + (event.key === "ArrowRight" ? 1 : -1));
        }
      },
    },
  };
}
