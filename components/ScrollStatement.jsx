"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";

const SIZE = 512;
const clamp = (value) => Math.min(1, Math.max(0, value));

export default function ScrollStatement() {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const mask = document.createElement("canvas");
    mask.width = mask.height = SIZE;
    const maskContext = mask.getContext("2d", { willReadFrequently: true });
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let desiredTime = 0;
    let progress = 0;
    let raf = 0;
    let disposed = false;

    // The video packs artwork and an alpha mask side by side, so its original
    // dark background never covers the statement or leaves a square border.
    const paint = () => {
      if (!context || !maskContext || video.readyState < 2) return;
      context.clearRect(0, 0, SIZE, SIZE);
      if (progress === 0 && !motion.matches) return;
      context.drawImage(video, 0, 0, SIZE, SIZE, 0, 0, SIZE, SIZE);
      maskContext.drawImage(video, SIZE, 0, SIZE, SIZE, 0, 0, SIZE, SIZE);
      const pixels = maskContext.getImageData(0, 0, SIZE, SIZE);
      for (let i = 0; i < pixels.data.length; i += 4) {
        const alpha = pixels.data[i];
        pixels.data[i + 3] = alpha < 8 ? 0 : alpha > 247 ? 255 : alpha;
        pixels.data[i] = pixels.data[i + 1] = pixels.data[i + 2] = 255;
      }
      maskContext.putImageData(pixels, 0, 0);
      context.globalCompositeOperation = "destination-in";
      context.drawImage(mask, 0, 0);
      context.globalCompositeOperation = "source-over";
    };
    const seek = () => {
      if (disposed || !Number.isFinite(video.duration) || video.seeking) return;
      if (Math.abs(video.currentTime - desiredTime) > 1 / 60) {
        video.currentTime = desiredTime;
      } else {
        paint();
      }
    };
    const update = () => {
      raf = 0;
      // Text rises naturally with the section, reaching screen center when
      // the sticky stage reaches the top. Only then does drawing begin.
      const height = root.querySelector(".scroll-statement-stage").getBoundingClientRect().height;
      const pinnedDistance = -root.getBoundingClientRect().top / height;
      progress = motion.matches ? 1 : clamp((pinnedDistance - 0.15) / 1.8);
      root.classList.toggle("is-scroll-driven", !motion.matches);
      root.dataset.progress = progress.toFixed(3);
      canvas.style.opacity = progress > 0 ? "1" : "0";
      if (Number.isFinite(video.duration)) {
        desiredTime = progress * Math.max(0, video.duration - 1 / 30);
        seek();
      }
    };
    const schedule = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    const onSeeked = () => {
      paint();
      // Catch up to the latest scroll position after a decoder seek completes.
      seek();
    };
    video.addEventListener("loadedmetadata", schedule);
    video.addEventListener("loadeddata", schedule);
    video.addEventListener("seeked", onSeeked);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    update();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(raf);
      video.removeEventListener("loadedmetadata", schedule);
      video.removeEventListener("loadeddata", schedule);
      video.removeEventListener("seeked", onSeeked);
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
          <video ref={videoRef} src={asset("/videos/uzu-opening-alpha.mp4")} muted playsInline preload="auto" />
        </div>
        <div className="scroll-statement-copy container-main text-center">
          <p className="font-display text-xs tracking-[0.3em] text-[var(--color-muted)]">ART NO UZU</p>
          <p className="mt-8 text-base md:text-lg leading-loose tracking-wider-jp">
            渦は、感情であり、呼吸であり、<br />記録であり、祈り。
          </p>
          <p className="mt-8 text-xs leading-loose text-[var(--color-muted)]">
            2015年から、「渦」を描き続けている。<br />私が変われば、渦も変わる。
          </p>
        </div>
      </div>
    </section>
  );
}
