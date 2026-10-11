"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { asset } from "@/lib/asset";

const OPENING_DURATION = 3000;
const FRAME_SIZE = 512;

function OpeningVideo({ contentRef }) {
  const [visible, setVisible] = useState(true);
  const [failed, setFailed] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Respect the visitor's motion setting and keep the page immediately usable.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      return;
    }

    const content = contentRef.current;
    const previousOverflow = document.body.style.overflow;
    content.inert = true;
    document.body.style.overflow = "hidden";

    // The MP4 packs color on the left and an alpha mask on the right, keeping
    // ordinary H.264 playback while revealing the fabric behind the artwork.
    const video = videoRef.current;
    const context = canvasRef.current?.getContext("2d");
    const mask = document.createElement("canvas");
    mask.width = mask.height = FRAME_SIZE;
    const maskContext = mask.getContext("2d", { willReadFrequently: true });
    let stopped = false;
    let frameRequest;
    let lastTime = -1;

    const drawFrame = () => {
      if (stopped || !video || !context || !maskContext) return;
      if (video.readyState >= 2 && video.currentTime !== lastTime) {
        lastTime = video.currentTime;
        context.clearRect(0, 0, FRAME_SIZE, FRAME_SIZE);
        context.drawImage(video, 0, 0, FRAME_SIZE, FRAME_SIZE, 0, 0, FRAME_SIZE, FRAME_SIZE);
        maskContext.drawImage(video, FRAME_SIZE, 0, FRAME_SIZE, FRAME_SIZE, 0, 0, FRAME_SIZE, FRAME_SIZE);
        const pixels = maskContext.getImageData(0, 0, FRAME_SIZE, FRAME_SIZE);
        for (let i = 0; i < pixels.data.length; i += 4) {
          const alpha = pixels.data[i];
          pixels.data[i + 3] = alpha < 8 ? 0 : alpha > 247 ? 255 : alpha;
          pixels.data[i] = pixels.data[i + 1] = pixels.data[i + 2] = 255;
        }
        maskContext.putImageData(pixels, 0, 0);
        context.globalCompositeOperation = "destination-in";
        context.drawImage(mask, 0, 0);
        context.globalCompositeOperation = "source-over";
      }
      frameRequest = video.requestVideoFrameCallback
        ? video.requestVideoFrameCallback(drawFrame)
        : window.requestAnimationFrame(drawFrame);
    };
    const stopDrawing = () => {
      stopped = true;
      if (video?.cancelVideoFrameCallback) video.cancelVideoFrameCallback(frameRequest);
      else window.cancelAnimationFrame(frameRequest);
      video?.pause();
    };
    drawFrame();

    const unlock = () => {
      content.inert = false;
      document.body.style.overflow = previousOverflow;
    };
    // Always finish after three seconds, including slow/blocked video playback.
    const timer = window.setTimeout(() => {
      setVisible(false);
      stopDrawing();
      unlock();
    }, OPENING_DURATION);

    videoRef.current?.play().catch(() => setFailed(true));

    return () => {
      window.clearTimeout(timer);
      stopDrawing();
      unlock();
    };
  }, [contentRef]);

  if (!visible) return null;

  return (
    <div
      className="opening-video"
      style={{ backgroundImage: `url("${asset("/images/textures/white-painting-canvas.webp")}")` }}
      role="status"
      aria-label="オープニングを表示しています"
    >
      {failed ? (
        <span className="opening-video-fallback" aria-hidden="true">ART NO UZU</span>
      ) : (
        <>
          <canvas ref={canvasRef} width={FRAME_SIZE} height={FRAME_SIZE} aria-hidden="true" />
          <video
            ref={videoRef}
            src={asset("/videos/uzu-opening-alpha.mp4")}
            autoPlay
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            onError={() => setFailed(true)}
            disablePictureInPicture
            disableRemotePlayback
          />
        </>
      )}
    </div>
  );
}

export default function OpeningExperience({ children }) {
  const pathname = usePathname();
  const contentRef = useRef(null);

  return (
    <>
      {/* Layouts persist during client navigation; replay on every new page. */}
      <OpeningVideo key={pathname} contentRef={contentRef} />
      <noscript><style>{`.opening-video { display: none; }`}</style></noscript>
      <div ref={contentRef} className="opening-content">{children}</div>
    </>
  );
}
