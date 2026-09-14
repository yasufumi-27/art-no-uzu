// public/images/works/<年>/ の画像から作品一覧（lib/works.generated.js）を作る。
//   node scripts/gen-works.mjs   （npm run build の前に自動実行される）
// ファイル名の規則：<年>_<作品番号>[_<枚数>].webp（-thumb.webp は一覧用の縮小版）
// 同じ作品番号の画像は1作品の複数枚としてまとめる。
import { readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = "public/images/works";

const works = [];
for (const year of readdirSync(ROOT).filter((d) => /^\d{4}$/.test(d))) {
  const byNo = new Map();
  for (const f of readdirSync(join(ROOT, year))) {
    const m = f.match(/^(\d{4})_(\d+)(?:_(\d+))?\.webp$/);
    if (!m) continue;
    const no = Number(m[2]);
    const page = m[3] ? Number(m[3]) : 1;
    if (!byNo.has(no)) byNo.set(no, []);
    byNo.get(no).push({ page, src: `/images/works/${year}/${f.replace(/\.webp$/, "")}` });
  }
  for (const [no, imgs] of [...byNo].sort((a, b) => a[0] - b[0])) {
    const id = `${year}_${no}`;
    works.push({
      id,
      year: Number(year),
      no,
      images: imgs.sort((a, b) => a.page - b.page).map((i) => i.src),
    });
  }
}

writeFileSync(
  "lib/works.generated.js",
  `// scripts/gen-works.mjs が生成。手で編集しない。\nexport const WORK_IMAGES = ${JSON.stringify(works, null, 2)};\n`
);
console.log(`gen-works: ${works.length} works`);
