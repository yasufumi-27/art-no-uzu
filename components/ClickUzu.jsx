"use client";

import { useEffect } from "react";
import { spiralPath } from "@/components/Spiral";

// クリック（タップ）した位置に小さな渦が生まれ、波紋のように広がって消える。
// 常時表示の背景渦の代わり（2026-09 クライアント回答）。見た目は globals.css の .click-uzu。
const PATH = spiralPath(3.5, 240, 92);
const MAX_ALIVE = 6;
const LIFETIME = 1900;

export default function ClickUzu() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const alive = [];
    const onPointerDown = (e) => {
      if (e.button !== 0) return;
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 200 200");
      svg.setAttribute("aria-hidden", "true");
      svg.classList.add("click-uzu");
      svg.style.left = `${e.clientX}px`;
      svg.style.top = `${e.clientY}px`;
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", PATH);
      path.setAttribute("pathLength", "1");
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "currentColor");
      // 線幅は画面上のピクセルで固定（渦の大きさを変えても線の太さは変わらない）
      path.setAttribute("stroke-width", "1.3");
      path.setAttribute("vector-effect", "non-scaling-stroke");
      path.setAttribute("stroke-linecap", "round");
      svg.appendChild(path);
      document.body.appendChild(svg);

      alive.push(svg);
      if (alive.length > MAX_ALIVE) alive.shift().remove();
      setTimeout(() => {
        svg.remove();
        const i = alive.indexOf(svg);
        if (i !== -1) alive.splice(i, 1);
      }, LIFETIME);
    };

    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      alive.forEach((el) => el.remove());
    };
  }, []);

  return null;
}
