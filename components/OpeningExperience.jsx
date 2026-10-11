"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { asset } from "@/lib/asset";

const OPENING_DURATION = 3000;

function OpeningLogo({ contentRef }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
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
    const timer = window.setTimeout(() => {
      setVisible(false);
      unlock();
    }, OPENING_DURATION);
    return () => {
      window.clearTimeout(timer);
      unlock();
    };
  }, [contentRef]);

  if (!visible) return null;

  return (
    <div
      className="opening-screen"
      style={{ backgroundImage: `url("${asset("/images/textures/white-painting-canvas.webp")}")` }}
      role="status"
      aria-label="オープニングを表示しています"
    >
      <img className="opening-logo" src={asset("/images/logo/emblem.png")} alt="YOSHIMI KAMITANI" />
    </div>
  );
}

export default function OpeningExperience({ children }) {
  const pathname = usePathname();
  const contentRef = useRef(null);

  return (
    <>
      <OpeningLogo key={pathname} contentRef={contentRef} />
      <noscript><style>{`.opening-screen { display: none; }`}</style></noscript>
      <div ref={contentRef} className="opening-content">{children}</div>
    </>
  );
}
