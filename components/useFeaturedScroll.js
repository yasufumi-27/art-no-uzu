"use client";

import { useEffect, useRef, useState } from "react";

// ユーザーの横操作だけで位置を変える。ページの縦スクロールとは同期しない。
export default function useFeaturedScroll(count, onProgress) {
  const viewportRef = useRef(null);
  const position = useRef(0);
  const strideRef = useRef(1);
  const gesture = useRef(null);
  const touching = useRef(false);
  const suppressClick = useRef(false);
  const settleTimer = useRef(null);
  const [dragging, setDragging] = useState(false);

  function measureStride() {
    const slides = viewportRef.current?.querySelectorAll("[data-featured-slide]");
    return slides?.length > 1 ? slides[1].getBoundingClientRect().left - slides[0].getBoundingClientRect().left : slides?.[0]?.getBoundingClientRect().width || 1;
  }

  function moveTo(index) {
    const el = viewportRef.current;
    if (!el) return;
    clearTimeout(settleTimer.current);
    el.scrollTo({ left: Math.max(0, Math.min(count - 1, index)) * measureStride(),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  function settle() {
    clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      const el = viewportRef.current;
      if (!el || touching.current || gesture.current?.moved) return;
      const stride = measureStride();
      const index = Math.round(el.scrollLeft / stride);
      if (Math.abs(index * stride - el.scrollLeft) > 1) moveTo(index);
    }, 180);
  }

  function onScroll(event) {
    const el = event.currentTarget;
    const stride = measureStride();
    if (Math.abs(stride - strideRef.current) > .5) {
      strideRef.current = stride;
      el.scrollLeft = Math.round(position.current) * stride;
      return;
    }
    position.current = Math.max(0, Math.min(count - 1, el.scrollLeft / stride));
    onProgress(count > 1 ? position.current / (count - 1) : 0);
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
      strideRef.current = measureStride();
      el.scrollLeft = Math.round(position.current) * strideRef.current;
    });
    observer.observe(el);
    return () => { observer.disconnect(); clearTimeout(settleTimer.current); };
  }, []);

  return {
    viewportRef, dragging,
    previous: () => moveTo(Math.round(position.current) - 1),
    next: () => moveTo(Math.round(position.current) + 1),
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
        event.currentTarget.scrollLeft = current.left - distance;
      },
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onLostPointerCapture: endDrag,
      onTouchStart() { suppressClick.current = false; touching.current = true; clearTimeout(settleTimer.current); },
      onTouchEnd() { touching.current = false; settle(); },
      onTouchCancel() { touching.current = false; settle(); },
      onDragStart: event => event.preventDefault(),
      onClickCapture(event) {
        if (suppressClick.current && event.detail > 0) { event.preventDefault(); event.stopPropagation(); }
      },
      onKeyDown(event) {
        const index = Math.round(position.current);
        if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
          event.preventDefault();
          moveTo(event.key === "Home" ? 0 : event.key === "End" ? count - 1 : index + (event.key === "ArrowRight" ? 1 : -1));
        }
      },
    },
  };
}
