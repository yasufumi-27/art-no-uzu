import { ARCHIVE_ADDITIONS } from "./archive-additions";

// 固定の年別優先枠。通常カードは元の順序を保ち、各枠の下へ流す。
export const ARCHIVE_FEATURES = {
  2015: [{ id: "2015_1", label: "最初の渦" }],
  2016: [{ id: "2016_6", label: "Superfly" }, { id: "2016_1", label: "Magazine" }],
  2017: [{ id: "2017_13", label: "虹郎" }, { id: "2017_9", label: "緑の渦" }],
  2018: [{ id: "2018_4", label: "渦展 Vol.１" }, { id: "2018_12", label: "［vol.1］ starring Sawa Nimura", aspectRatio: "1658 / 2000", additionalCardImages: ["2018_12_2","2018_12_3","2018_12_4","2018_12_5","2018_12_6","2018_12_7"] }, { id: "2018_14", label: "［vol.2］ starring Hiroto Oshita", imageNumber: 2, aspectRatio: "1280 / 796", additionalCardImages: ["2018_14_3","2018_14_4","2018_14_5","2018_14_6","2018_14_7"] }, { id: "2018_16", label: "［vol.3］ starring Lisa Oda", aspectRatio: "2000 / 1408", additionalCardImages: ["2018_16_2","2018_16_3","2018_16_4","2018_16_5"] }, { id: "2018_23", label: "［vol.4］ starring KINARI", aspectRatio: "1280 / 749", additionalCardImages: ["2018_23_2","2018_23_3","2018_23_4","2018_23_5"], fillFromImages: true }],
  2019: [{ id: "2019_1", label: "渦展 Vol.2", cardImages: ["2019_3", "2019_4"], imageNumber: 3, aspectRatio: "1280 / 861" }, { id: "2019_9", label: "EYESCREAM Paris et Tourbillon vol.1", aspectRatio: "2000 / 1397", fillFromImages: true }, { id: "2019_10", label: "EYESCREAM Paris et Tourbillon vol.2", aspectRatio: "1648 / 2000", fillFromImages: true }, { id: "2019_11", label: "EYESCREAM Paris et Tourbillon vol.3", aspectRatio: "1677 / 2000", fillFromImages: true }],
  2020: [{ id: "2020_4", label: "白石聖", objectPosition: "center top" }, { id: "2020_1", label: "EYESCREAM Paris et Tourbillon vol.4", aspectRatio: "2000 / 1246", fillFromImages: true }, { id: "2020_2", label: "EYESCREAM Paris et Tourbillon vol.5", aspectRatio: "2000 / 1162", fillFromImages: true }, { id: "2020_3", label: "EYESCREAM Paris et Tourbillon vol.6", aspectRatio: "2000 / 1168", fillFromImages: true }],
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
  const additionalCards = features.flatMap(feature => (feature.additionalCardImages || []).flatMap(id => {
    const image = feature.work?.images.find(src => src.endsWith(`/${id}.webp`));
    return image ? [{ key: id, work: feature.work, image }] : [];
  }));
  const cards = [
    ...detailCards,
    ...items.filter(w => !featureIds.has(w.id)).map(work => ({ key: work.id, work })),
    ...extras.filter(e => !featureExtras.has(e.href)).map(extra => ({ key: extra.href, extra })),
    ...additionalCards,
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
    // 不足分は同じ作品の写真で補う。外部記事は受領素材の追加を指定した枠だけを対象にする。
    const candidates = (feature.work?.hasDetail || feature.fillFromImages) ? feature.work.images || [] : [];
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
  // 年別の追加素材は既存カードを残して空きを埋め、余りも8枚単位で掲載する。
  for (const work of ARCHIVE_ADDITIONS.filter(work => work.year === year)) {
    let group = groups.find(group => group.cards.length < 8);
    if (!group) {
      group = { feature: null, cards: [] };
      groups.push(group);
    }
    group.cards.push({ key: work.id, work });
    if (group.feature) group.missing = 8 - group.cards.length;
  }
  return groups;
}
