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
    const phrases = [...root.querySelectorAll("[data-reveal-start]")].map(element => ({
      element,
      start: Number(element.dataset.revealStart),
      end: Number(element.dataset.revealEnd),
      radius: 0,
    }));
    let progress = 0;
    let raf = 0;
    let paintedFrame = -1;
    let disposed = false;

    // Measure only when the text changes size, not on every scroll frame.
    const measurePhrases = () => {
      phrases.forEach(phrase => {
        const { width, height } = phrase.element.getBoundingClientRect();
        phrase.radius = Math.hypot(width / 2, height * 0.55) + 20;
        phrase.element.style.setProperty("--ripple-size", `${phrase.radius * 2}px`);
      });
    };

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
      // Use the drawing's progress for every phrase, including reverse scrolling.
      // A soft circular alpha mask travels outward like a drop on water.
      // Two neutral, soft wave fronts spread behind the unblurred glyphs.
      phrases.forEach(({ element, start, end, radius }) => {
        const phase = motion.matches ? 1 : clamp((progress - start) / (end - start));
        const spread = phase * phase * (3 - 2 * phase);
        const edge = spread * radius;
        const opacity = clamp(phase / 0.24);
        const echo = clamp((phase - 0.18) / 0.82);
        element.style.setProperty("--ripple-scale", (0.06 + spread * 1.08).toFixed(3));
        element.style.setProperty("--ripple-opacity", (Math.sin(Math.PI * phase) * 0.8).toFixed(3));
        element.style.setProperty("--ripple-echo-scale", (0.04 + echo * echo * (3 - 2 * echo)).toFixed(3));
        element.style.setProperty("--ripple-echo-opacity", (Math.sin(Math.PI * echo) * 0.5).toFixed(3));
        element.style.setProperty("--phrase-opacity", (opacity * opacity * (3 - 2 * opacity)).toFixed(3));
        element.style.setProperty("--phrase-mask", phase >= 1 ? "none" :
          `radial-gradient(circle at 50% 55%, #000 ${Math.max(0, edge - 20).toFixed(2)}px, transparent ${edge.toFixed(2)}px)`);
      });
      paint();
    };
    const schedule = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    const phraseSizes = new ResizeObserver(() => {
      measurePhrases();
      schedule();
    });
    phrases.forEach(({ element }) => phraseSizes.observe(element));
    measurePhrases();
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
      phraseSizes.disconnect();
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <section ref={rootRef} className="scroll-statement" aria-label="渦のコンセプト">
      <div className="scroll-statement-stage">
        <div className="scroll-statement-art" aria-hidden="true">
          <canvas ref={canvasRef} width={SIZE} height={SIZE} />
        </div>
        <div className="scroll-statement-copy container-main text-center">
          <p className="scroll-statement-label font-display text-xs tracking-[0.3em] text-[var(--color-muted)]">ART NO UZU</p>
          <p className="scroll-statement-quote leading-loose tracking-wider-jp">
            <span className="statement-reveal" data-reveal-start="0.03" data-reveal-end="0.18"><span className="statement-reveal-text">渦は、</span></span><span className="statement-reveal" data-reveal-start="0.13" data-reveal-end="0.33"><span className="statement-reveal-text">感情であり、</span></span><br className="md:hidden" /><span className="statement-reveal" data-reveal-start="0.30" data-reveal-end="0.51"><span className="statement-reveal-text">呼吸であり、</span></span><br /><span className="statement-reveal" data-reveal-start="0.48" data-reveal-end="0.69"><span className="statement-reveal-text">記録であり、</span></span><span className="statement-reveal" data-reveal-start="0.65" data-reveal-end="0.88"><span className="statement-reveal-text">祈り。</span></span>
          </p>
          <p className="scroll-statement-detail leading-loose text-[var(--color-muted)]">
            2015年から、「渦」を描き続けている。<br />私が変われば、渦も変わる。
          </p>
        </div>
      </div>
    </section>
  );
}
