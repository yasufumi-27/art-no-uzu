"use client";

import { useEffect, useRef, useState } from "react";

// 作品画像の共通コンポーネント（仕様書 15）。
// Lazy Load（既定）＋ 読み込み完了時にフェードイン表示する。
export default function FadeImg({ className = "", loading = "lazy", ...props }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // キャッシュ済み画像は onLoad が発火しないことがあるため complete を確認
  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  return (
    <img
      ref={ref}
      loading={loading}
      onLoad={() => setLoaded(true)}
      className={`fade-in ${loaded ? "is-visible" : ""} ${className}`}
      {...props}
    />
  );
}
