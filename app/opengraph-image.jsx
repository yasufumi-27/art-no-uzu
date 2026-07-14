import { ImageResponse } from "next/og";

// OGP 画像（仕様書 17）。静的エクスポート時にビルドで PNG を生成する。
// Satori のデフォルトフォントは和文グリフを持たないため、文言は欧文のみで構成。
export const dynamic = "force-static";

export const alt = "ART NO UZU — Kamitani Yoshimi Official Site";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 渦（アルキメデス螺旋）のパスを生成
function spiralPath(cx, cy, turns, maxR, steps = 400) {
  let d = `M ${cx} ${cy}`;
  for (let i = 1; i <= steps; i++) {
    const t = (i / steps) * turns * Math.PI * 2;
    const r = (i / steps) * maxR;
    const x = cx + r * Math.cos(t);
    const y = cy + r * Math.sin(t);
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f4f2",
          color: "#1a1a1a",
          position: "relative",
        }}
      >
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <path
            d={spiralPath(600, 315, 7, 430)}
            fill="none"
            stroke="#8a877f"
            strokeWidth="1.2"
            opacity="0.45"
          />
        </svg>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            letterSpacing: "0.25em",
            fontWeight: 400,
          }}
        >
          ART NO UZU
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 26,
            letterSpacing: "0.35em",
            color: "#8a877f",
          }}
        >
          KAMITANI YOSHIMI — OFFICIAL SITE
        </div>
      </div>
    ),
    { ...size }
  );
}
