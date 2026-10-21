// 固定の年別優先枠。通常カードは元の順序を保ち、各枠の下へ流す。
export const ARCHIVE_FEATURES = {
  2015: [{ id: "2015_1", label: "最初の渦" }],
  2016: [{ id: "2016_6", label: "Superfly" }, { id: "2016_1", label: "Magazine" }],
  2017: [{ id: "2017_13", label: "虹郎" }, { id: "2017_9", label: "緑の渦" }],
  2018: [{ id: "2018_4", label: "渦展 Vol.１" }, { id: "2018_14", label: "ヒロトくん" }, { id: "2018_23", label: "［vol.4］ starring KINARI", aspectRatio: "1280 / 749" }],
  2019: [{ id: "2019_1", label: "渦展 Vol.2", cardImages: ["2019_3", "2019_4"], imageNumber: 3, aspectRatio: "1280 / 861" }, { id: "2019_11", label: "EYESCREAM Vol.3" }],
  2020: [{ id: "2020_4", label: "白石聖" }, { id: "2020_3", label: "EYESCREAM Vol.6" }],
  2021: [{ id: "2021_1", label: "2021" }],
  2022: [{ id: "2022_6", label: "いい人間の教科書" }],
  2023: [{ id: "2023_2", label: "NIKE" }, { id: "2023_1", label: "パリ・サンジェルマン" }],
  2024: [{ id: "2024_1", label: "渦展 Vol.3" }, { id: "2024_5", label: "エッセイ & 作品集", imageNumber: 12, aspectRatio: "3 / 2" }],
  2025: [{ id: "2025_1", label: "渦に沈む" }, { id: "2025_4", label: "生まれた喜び" }, { id: "2025_5", label: "作品集", book: true }, { id: "2025_3", label: "POPUP" }],
  2026: [{ id: "2026_17", label: "Shinfula × YOSHIMI KAMITANI" }, { id: "2026_8", label: "夜を泳ぐ海月", portrait: true }],
};

export function archiveGroups(items, extras, year) {
  const features = (ARCHIVE_FEATURES[year] || []).map(config => {
    const work = items.find(w => w.id === config.id);
    const extra = config.extraKind ? extras.find(e => e.kind === config.extraKind) : null;
    const book = config.book ? extras.find(e => e.kind === "Essay") : null;
    if (!work && !extra) return null;
    return { ...config, work, extra, image: work?.images?.find(src => config.imageNumber && src.endsWith(`_${config.imageNumber}.webp`)) || book?.image || work?.images?.[0] || work?.thumb || extra?.image };
  }).filter(Boolean);
  const featureIds = new Set(features.map(f => f.work?.id));
  const featureExtras = new Set(features.flatMap(f => [f.extra?.href, ...(f.book ? extras.filter(e => e.kind === "Essay").map(e => e.href) : [])]));
  // 同じ展示に統合した写真も、小画像から統合先の詳細へ直接案内する。
  const detailCards = features.flatMap(feature => (feature.cardImages || []).flatMap(id => {
    const image = feature.work?.images.find(src => src.endsWith(`/${id}.webp`));
    return image ? [{ key: id, work: feature.work, image }] : [];
  }));
  const cards = [
    ...detailCards,
    ...items.filter(w => !featureIds.has(w.id)).map(work => ({ key: work.id, work })),
    ...extras.filter(e => !featureExtras.has(e.href)).map(extra => ({ key: extra.href, extra })),
  ];
  if (!features.length) return [{ feature: null, cards }];
  // サムネイルと原寸を同じ画像として数え、同じ写真で枠を埋めない。
  const imageKey = src => src.replace(/-thumb\.webp$/, ".webp");
  const used = new Set([
    ...cards.map(c => c.image || c.work?.thumb || c.extra?.image).filter(Boolean),
    ...features.map(f => f.image).filter(Boolean),
  ].map(imageKey));
  const groups = features.map((feature, i) => {
    // 既存の小画像は上から順番を維持する。
    const group = cards.slice(i * 8, (i + 1) * 8);
    // 不足分は、この大画像の詳細ページに掲載している写真だけで補う。
    const candidates = feature.work?.hasDetail ? feature.work.images || [] : [];
    for (const image of candidates) {
      if (group.length >= 8) break;
      const key = imageKey(image);
      if (used.has(key)) continue;
      used.add(key);
      group.push({ key: `${feature.work.id}:${image}`, work: feature.work, image });
    }
    return { feature, cards: group, missing: 8 - group.length };
  });
  // 8枚×優先枠より作品が多い年も、残りを掲載から落とさない。
  for (let offset = features.length * 8; offset < cards.length; offset += 8) {
    groups.push({ feature: null, cards: cards.slice(offset, offset + 8) });
  }
  return groups;
}
