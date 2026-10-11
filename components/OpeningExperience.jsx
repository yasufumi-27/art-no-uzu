"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { asset } from "@/lib/asset";

const OPENING_DURATION = 3000;

function OpeningVideo({ contentRef }) {
  const [visible, setVisible] = useState(true);
  const [failed, setFailed] = useState(false);
  const videoRef = useRef(null);

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

    const unlock = () => {
      content.inert = false;
      document.body.style.overflow = previousOverflow;
    };
    // Always finish after three seconds, including slow/blocked video playback.
    const timer = window.setTimeout(() => {
      setVisible(false);
      unlock();
    }, OPENING_DURATION);

    videoRef.current?.play().catch(() => setFailed(true));

    return () => {
      window.clearTimeout(timer);
      unlock();
    };
  }, [contentRef]);

  if (!visible) return null;

  return (
    <div className="opening-video" role="status" aria-label="オープニングを表示しています">
      {failed ? (
        <span className="opening-video-fallback" aria-hidden="true">ART NO UZU</span>
      ) : (
        <video
          ref={videoRef}
          src={asset("/videos/uzu-opening-3s.mp4")}
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          onError={() => setFailed(true)}
          disablePictureInPicture
          disableRemotePlayback
        />
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
