// デモ用のプレースホルダー作品画像を生成する。
// 本番では microCMS から配信される WebP 画像に置き換える。
// 静けさ・緊張感のあるトーンに寄せた抽象的なグラデーションを id から決定的に生成する。

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

const PALETTES = [
  ["#dcd8d0", "#7a7266", "#2b2621"],
  ["#e6e2db", "#b03a2e", "#1c1a17"],
  ["#d7d9d6", "#586b63", "#20241f"],
  ["#e4ddd2", "#8a6d4b", "#231d16"],
  ["#dad7dd", "#4a4b63", "#1a1a22"],
  ["#e8e4de", "#9c8878", "#2a241d"],
];

export function placeholder(id, ratio = 4 / 5) {
  const h = hash(id);
  const [c0, c1, c2] = PALETTES[h % PALETTES.length];
  const w = 800;
  const height = Math.round(w / ratio);
  const cx = 20 + (h % 60);
  const cy = 20 + ((h >> 3) % 60);
  const angle = h % 180;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${height}' viewBox='0 0 ${w} ${height}'>
    <defs>
      <linearGradient id='g' gradientTransform='rotate(${angle})'>
        <stop offset='0%' stop-color='${c0}'/>
        <stop offset='55%' stop-color='${c1}'/>
        <stop offset='100%' stop-color='${c2}'/>
      </linearGradient>
      <radialGradient id='r' cx='${cx}%' cy='${cy}%' r='75%'>
        <stop offset='0%' stop-color='${c0}' stop-opacity='0.55'/>
        <stop offset='100%' stop-color='${c2}' stop-opacity='0'/>
      </radialGradient>
    </defs>
    <rect width='100%' height='100%' fill='url(#g)'/>
    <rect width='100%' height='100%' fill='url(#r)'/>
    <line x1='${cx * 8}' y1='0' x2='${cx * 6}' y2='${height}' stroke='${c2}' stroke-opacity='0.18' stroke-width='1.5'/>
    <line x1='${cy * 6}' y1='0' x2='${cy * 9}' y2='${height}' stroke='${c0}' stroke-opacity='0.25' stroke-width='1'/>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
