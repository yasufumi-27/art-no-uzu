// 固定の年別優先枠。通常カードは元の順序を保ち、各枠の下へ流す。
export const ARCHIVE_FEATURES = {
  2015: [{ id: "2015_1", label: "最初の渦" }],
  2016: [{ id: "2016_6", label: "Superfly" }, { id: "2016_1", label: "Magazine" }],
  2017: [{ id: "2017_13", label: "虹郎" }, { id: "2017_9", label: "緑の渦" }],
  2018: [{ id: "2018_4", label: "渦展 Vol.１" }, { id: "2018_22", label: "峯田さん" }, { id: "2018_14", label: "ヒロトくん" }],
  2019: [{ id: "2019_1", label: "渦写展" }, { id: "2019_11", label: "EYESCREAM Vol.3" }],
  2020: [{ id: "2020_4", label: "白石聖" }, { id: "2020_3", label: "EYESCREAM Vol.6" }],
  2021: [{ id: "2021_1", label: "2021" }],
  2022: [{ id: "2022_6", label: "いい人間の教科書" }],
  2023: [{ id: "2023_2", label: "NIKE" }, { id: "2023_1", label: "パリ・サンジェルマン" }],
  2024: [{ id: "2024_1", label: "渦展 Vol.3" }, { extraKind: "Essay", label: "エッセイ & 作品集" }],
  2025: [{ id: "2025_1", label: "渦に沈む" }, { id: "2025_4", label: "生まれた喜び" }, { id: "2025_5", label: "作品集", book: true }, { id: "2025_3", label: "POPUP" }],
  2026: [{ id: "2026_17", label: "Shinfula × YOSHIMI KAMITANI" }, { id: "2026_8", label: "夜を泳ぐ海月", portrait: true }],
};

export function archiveGroups(items, extras, year, { supplementLimit = 2 } = {}) {
  const features = (ARCHIVE_FEATURES[year] || []).map(config => {
    const work = items.find(w => w.id === config.id);
    const extra = config.extraKind ? extras.find(e => e.kind === config.extraKind) : null;
    const book = config.book ? extras.find(e => e.kind === "Essay") : null;
    if (!work && !extra) return null;
    return { ...config, work, extra, image: book?.image || work?.images?.[0] || work?.thumb || extra?.image };
  }).filter(Boolean);
  const featureIds = new Set(features.map(f => f.work?.id));
  const featureExtras = new Set(features.flatMap(f => [f.extra?.href, ...(f.book ? extras.filter(e => e.kind === "Essay").map(e => e.href) : [])]));
  const cards = [
    ...items.filter(w => !featureIds.has(w.id)).map(work => ({ key: work.id, work })),
    ...extras.filter(e => !featureExtras.has(e.href)).map(extra => ({ key: extra.href, extra })),
  ];
  if (!features.length) return [{ feature: null, cards }];
  const used = new Set([
    ...cards.map(c => c.work?.thumb || c.extra?.image).filter(Boolean),
    ...features.map(f => f.image).filter(Boolean),
  ].map(src => src.replace(/-thumb\.webp$/, ".webp")));
  const supplemental = features.flatMap(f => (f.work?.images || []).map(src => ({
    key: `${f.work.id}:${src}`, work: f.work, image: src,
  }))).filter(c => !used.has(c.image));
  const groups = features.map((feature, i) => {
    const group = cards.slice(i * 8, (i + 1) * 8);
    let added = 0;
    const candidates = [
      ...supplemental.filter(c => c.work.id === feature.work?.id),
      ...supplemental.filter(c => c.work.id !== feature.work?.id),
    ];
    for (const candidate of candidates) {
      if (group.length >= 8 || added >= supplementLimit) break;
      if (used.has(candidate.image)) continue;
      used.add(candidate.image);
      group.push(candidate);
      added++;
    }
    return { feature, cards: group };
  });
  // 8枚×優先枠より作品が多い年も、残りを掲載から落とさない。
  for (let offset = features.length * 8; offset < cards.length; offset += 8) {
    groups.push({ feature: null, cards: cards.slice(offset, offset + 8) });
  }
  return groups;
}
