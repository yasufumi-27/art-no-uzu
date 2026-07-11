// 渦（うず）モチーフ。神谷佳美の作品世界を象徴する装飾・アニメーション要素。
// 対数螺旋を SVG パスで描画する。
function spiralPath(turns = 4, points = 300, growth = 0.28) {
  const cx = 100;
  const cy = 100;
  let d = "";
  for (let i = 0; i <= points; i++) {
    const t = (i / points) * turns * Math.PI * 2;
    const r = growth * Math.exp(0.18 * t);
    const x = cx + r * Math.cos(t);
    const y = cy + r * Math.sin(t);
    d += `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  return d;
}

export default function Spiral({
  className = "",
  strokeWidth = 0.6,
  turns = 4,
  pathClassName = "",
}) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <path
        className={pathClassName}
        d={spiralPath(turns)}
        pathLength="1"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
