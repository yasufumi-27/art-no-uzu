"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";

const SIZE = 256;
const FRAMES = 90;
const COLUMNS = 10;
const clamp = (value) => Math.min(1, Math.max(0, value));

export default function ScrollStatement() {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const frames = new Image();
    let progress = 0;
    let raf = 0;
    let paintedFrame = -1;
    let disposed = false;

    // Transparent frames extracted from the supplied video. Ordinary images
    // avoid mobile browsers' restrictions on paused/hidden video seeking.
    const paint = () => {
      if (!context) return;
      const frame = progress === 0 && !motion.matches ? -1 : Math.round(progress * (FRAMES - 1));
      if (frame === paintedFrame) return;
      context.clearRect(0, 0, SIZE, SIZE);
      if (frame >= 0 && frames.complete && frames.naturalWidth) {
        context.drawImage(frames, (frame % COLUMNS) * SIZE, Math.floor(frame / COLUMNS) * SIZE,
          SIZE, SIZE, 0, 0, SIZE, SIZE);
        paintedFrame = frame;
      } else {
        paintedFrame = -1;
      }
      root.dataset.frame = String(paintedFrame);
    };
    const update = () => {
      raf = 0;
      if (disposed) return;
      const height = root.querySelector(".scroll-statement-stage").getBoundingClientRect().height;
      const pinnedDistance = -root.getBoundingClientRect().top / height;
      progress = motion.matches ? 1 : clamp((pinnedDistance - 0.15) / 1.8);
      root.classList.toggle("is-scroll-driven", !motion.matches);
      root.dataset.progress = progress.toFixed(3);
      canvas.style.opacity = progress > 0 ? "1" : "0";
      paint();
    };
    const schedule = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    frames.fetchPriority = "low";
    frames.onload = schedule;
    // The drawing starts well after this canvas first enters the viewport.
    // Fetch its atlas on approach instead of competing with the opening/hero.
    const preload = new IntersectionObserver((entries) => {
      if (entries.some(entry => entry.isIntersecting)) {
        frames.src = asset("/images/uzu-scroll-frames.webp");
        preload.disconnect();
      }
    });
    preload.observe(canvas);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    update();

    return () => {
      disposed = true;
      frames.onload = null;
      preload.disconnect();
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <section ref={rootRef} className="scroll-statement" aria-label="渦のドローイング">
      <div className="scroll-statement-stage">
        <div className="scroll-statement-art" aria-hidden="true">
          <canvas ref={canvasRef} width={SIZE} height={SIZE} />
        </div>

      </div>
    </section>
  );
}
