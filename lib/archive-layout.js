import { ARCHIVE_ADDITIONS } from "./archive-additions";
import { asset } from "./asset";

// 固定の年別優先枠。通常カードは元の順序を保ち、各枠の下へ流す。
export const ARCHIVE_FEATURES = {
  2015: [{ id: "2015_1", label: "一番最初に描いた渦" }],
  2016: [{ id: "2016_6", label: "Superfly 「Into The Circle」衣装　Paintig" }, { id: "2016_1", label: "Schön! Magazine Paintig" }],
  2017: [{ id: "2017_13", label: "村上虹郎 Body Paintig" }, { id: "2017_9", label: "「破壊と再生と破壊」" }],
  2018: [{ id: "2018_4", label: "渦展 Vol.１" }, { id: "2018_12", label: "［vol.1］ starring Sawa Nimura", additionalCardImages: ["2018_12_2","2018_12_3","2018_12_4","2018_12_5","2018_12_6","2018_12_7"] }, { id: "2018_14", label: "［vol.2］ starring Hiroto Oshita", imageNumber: 2, additionalCardImages: ["2018_14_3","2018_14_4","2018_14_5","2018_14_6","2018_14_7"] }, { id: "2018_16", label: "［vol.3］ starring Lisa Oda", additionalCardImages: ["2018_16_2","2018_16_3","2018_16_4","2018_16_5"] }, { id: "2018_23", label: "［vol.4］ starring KINARI", additionalCardImages: ["2018_23_2","2018_23_3","2018_23_4","2018_23_5"], fillFromImages: true }],
  2019: [{ id: "2019_1", label: "渦展 Vol.2", cardImages: ["2019_3", "2019_4"], imageNumber: 3 }, { id: "2019_9", label: "EYESCREAM Paris et Tourbillon vol.1", fillFromImages: true }, { id: "2019_10", label: "EYESCREAM Paris et Tourbillon vol.2", fillFromImages: true }, { id: "2019_11", label: "EYESCREAM Paris et Tourbillon vol.3", fillFromImages: true }],
  2020: [{ id: "2020_4", label: "白石聖 写真展「COLOR」衣装提供", objectPosition: "center top" }, { id: "2020_1", label: "EYESCREAM Paris et Tourbillon vol.4", fillFromImages: true }, { id: "2020_2", label: "EYESCREAM Paris et Tourbillon vol.5", fillFromImages: true }, { id: "2020_3", label: "EYESCREAM Paris et Tourbillon vol.6", fillFromImages: true }],
  2021: [{ id: "2021_1", label: "月の渦" }],
  2022: [{ id: "2022_6", label: "「いい人間の教科書」衣装提供" }],
  2023: [{ id: "2023_2", label: "NIKE AIR FORCE 1" }, { id: "2023_1", label: "PSG（パリ・サンジェルマンFC）コラボ" }],
  2024: [{ id: "2024_1", label: "渦展 Vol.3", fixedCardImages: ["2024_1_3", "2024_1_5", "2024_1_6", "2024_1_10", "2024_1_9", "2024_1_4", "2024_1_8", "2024_1_2"] }, { id: "2024_5", label: "『渦展 VOL.3』作品集", imageNumber: 12, objectPosition: "center 20%" }],
  2025: [{ id: "2025_1", label: "渦に沈む", fixedCardImages: ["2025_1_16", "2025_1_13", "2025_1_5", "2025_1_18", "2025_1_21", "2025_1_12", "2025_1_4", "2025_1_8"] }, { id: "2025_4", label: "個展「生まれた喜び」" }, { id: "2025_5", label: "『生まれた喜び』作品集", book: true, imageSource: "/images/works/2025/2025_5_25.webp" }, { id: "2025_2", label: "SEKAI NO OWARI" }],
  2026: [{ id: "2026_17", label: "SHINFULA × YOSHIMI KAMITANI" }, { id: "2026_8", label: "夜を泳ぐ海月", excludedCardImages: ["2026_8"], imageSource: "/images/works/2026/jellyfish-feature-20261022.webp", objectPosition: "center 25%" }],
};

// 小グリッド専用の表示写真。詳細ページの写真順は保持する。
const ARCHIVE_CARD_IMAGES = {
  "2025_3": "/images/works/2025/popup-card-20261022.webp",
};

export function archiveGroups(items, extras, year) {
  const features = (ARCHIVE_FEATURES[year] || []).map(config => {
    const work = items.find(w => w.id === config.id);
    const extra = config.extraKind ? extras.find(e => e.kind === config.extraKind) : null;
    const book = config.book ? extras.find(e => e.kind === "Essay") : null;
    if (!work && !extra) return null;
    return { ...config, work, extra, image: (config.imageSource && asset(config.imageSource)) || work?.images?.find(src => config.imageNumber && src.endsWith(`_${config.imageNumber}.webp`)) || book?.image || work?.images?.[0] || work?.thumb || extra?.image };
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
    ...items.filter(w => !featureIds.has(w.id) && w.id !== "2025_16").map(work => ({ key: work.id, work, ...(ARCHIVE_CARD_IMAGES[work.id] ? { image: asset(ARCHIVE_CARD_IMAGES[work.id]) } : {}) })),
    ...extras.filter(e => !featureExtras.has(e.href)).map(extra => {
      const work = extra.workId ? items.find(work => work.id === extra.workId) : null;
      return work ? { key: extra.href, work, image: extra.image } : { key: extra.href, extra };
    }),
    ...additionalCards,
  ];
  if (!features.length) return [{ feature: null, cards }];
  // サムネイルと原寸を同じ画像として数え、同じ写真で枠を埋めない。
  const imageKey = src => src.replace(/-thumb\.webp$/, ".webp");
  const used = new Set([
    ...cards.map(c => c.image || c.work?.thumb || c.extra?.image).filter(Boolean),
    ...features.map(f => f.image).filter(Boolean),
  ].map(imageKey));
  const displacedCards = [];
  const groups = features.map((feature, i) => {
    // 既存の小画像は上から順番を維持する。
    const group = cards.slice(i * 8, (i + 1) * 8);
    // 展示内からランダムに選定済みの8枚を固定し、表示のたびに写真が変わるのを防ぐ。
    if (feature.fixedCardImages) {
      displacedCards.push(...group);
      const selected = feature.fixedCardImages.flatMap(id => {
        const image = feature.work?.images.find(src => src.endsWith(`/${id}.webp`));
        return image ? [{ key: id, work: feature.work, image }] : [];
      });
      selected.forEach(card => used.add(imageKey(card.image)));
      return { feature, cards: selected, missing: 8 - selected.length };
    }
    // 不足分は同じ作品の写真で補う。外部記事は受領素材の追加を指定した枠だけを対象にする。
    const candidates = (feature.work?.hasDetail || feature.fillFromImages) ? feature.work.images || [] : [];
    for (const image of candidates) {
      if (group.length >= 8) break;
      const key = imageKey(image);
      if (used.has(key) || (feature.excludedCardImages || []).some(id => image.endsWith(`/${id}.webp`))) continue;
      used.add(key);
      group.push({ key: `${feature.work.id}:${image}`, work: feature.work, image });
    }
    return { feature, cards: group, missing: 8 - group.length };
  });
  // 8枚×優先枠より作品が多い年も、残りを掲載から落とさない。
  for (let offset = features.length * 8; offset < cards.length; offset += 8) {
    groups.push({ feature: null, cards: cards.slice(offset, offset + 8) });
  }
  // 差し替え前の作品カードは年末尾に残し、他の展示の8枚を変更しない。
  for (let offset = 0; offset < displacedCards.length; offset += 8) {
    groups.push({ feature: null, cards: displacedCards.slice(offset, offset + 8) });
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
  // セカオワ直下は4枚＋熱海4枚。旧枠にあった同作品の写真は重複させない。
  if (year === 2025) {
    const target = groups.find(group => group.feature?.work?.id === "2025_2");
    if (target) {
      const work = target.feature.work;
      const retained = target.cards.filter(card => card.work?.id !== work.id);
      for (const group of groups) {
        group.cards = group.cards.filter(card => card.work?.id !== work.id);
        if (group.feature) group.missing = 8 - group.cards.length;
      }
      const selected = [2, 3, 6, 8].map(number => ({
        key: `sekai-${number}`, work,
        image: asset(`/images/works/2025/2025_2_${number}.webp`),
      }));
      const atami = [1, 2, 3, 4].map(number => ({
        key: `atami-${number}`,
        work: { id: `atami-${number}`, year: 2025, title: "熱海", category: "Works", hasDetail: false,
          instagram: "https://youtu.be/NP1opzAM2bk?si=acv3Mut2MzojCTK_", linkLabel: "YouTube" },
        image: asset(`/images/works/2025/atami-20261022-${number}.webp`),
      }));
      target.cards = [...selected, ...atami];
      target.missing = 0;
      if (retained.length) groups.push({ feature: null, cards: retained });
    }
  }
  // 元の作品7枚＋「音の奥に」をTOKYO POPUP直下に配置し、POPUPの小画像は外す。
  if (year === 2025) {
    const popup = items.find(work => work.id === "2025_3");
    if (popup) {
      const movedIds = ["2025_6", "2025_7", "2025_8", "2025_9", "2025_10", "2025_11", "2025_12", "2025_16"];
      const moved = movedIds.flatMap(id => {
        const work = items.find(item => item.id === id);
        return work ? [{ key: id, work }] : [];
      });
      const removed = new Set([popup.id, ...movedIds]);
      for (const group of groups) {
        const previousLength = group.cards.length;
        group.cards = group.cards.filter(card => !removed.has(card.work?.id));
        // 移動元の展示枠は、その展示の未使用写真で8枚まで補充する。
        if (group.feature && group.cards.length < previousLength) {
          const inUse = new Set(groups.flatMap(g => [g.feature?.image, ...g.cards.map(c => c.image || c.work?.thumb)]).filter(Boolean).map(imageKey));
          for (const image of group.feature.work?.images || []) {
            if (group.cards.length >= 8) break;
            if (inUse.has(imageKey(image))) continue;
            group.cards.push({ key: `${group.feature.work.id}:${image}`, work: group.feature.work, image });
            inUse.add(imageKey(image));
          }
          group.missing = 8 - group.cards.length;
        }
      }
      const popupGroup = { feature: { id: popup.id, work: popup, label: "TOKYO POPUP", image: asset(ARCHIVE_CARD_IMAGES[popup.id]) }, cards: moved, missing: 8 - moved.length };
      const afterFeatures = groups.findIndex(group => !group.feature);
      groups.splice(afterFeatures === -1 ? groups.length : afterFeatures, 0, popupGroup);
    }
  }
  // 2024年は指定の人物カードを外し、囲まれた2作品を年の最後へ移す。
  if (year === 2024) {
    const endingIds = ["2024_2", "2024_4"];
    const all = groups.flatMap(group => group.cards);
    const ending = endingIds.flatMap(id => all.filter(card => card.work?.id === id));
    for (const group of groups) {
      group.cards = group.cards.filter(card => !["2024_3", ...endingIds].includes(card.work?.id));
      if (group.feature) group.missing = 8 - group.cards.length;
    }
    if (ending.length) groups.push({ feature: null, cards: ending });
  }
  // 2026年の人物写真4枚は、補充された作品写真より後ろにまとめる。
  if (year === 2026) {
    const endingIds = ["2026-addition-01", "2026-addition-02", "2026-addition-03", "2026-addition-04"];
    const all = groups.flatMap(group => group.cards);
    const ordered = [...all.filter(card => !endingIds.includes(card.work?.id)),
      ...endingIds.flatMap(id => all.filter(card => card.work?.id === id))];
    let offset = 0;
    for (const group of groups) {
      const length = group.cards.length;
      group.cards = ordered.slice(offset, offset + length);
      offset += length;
    }
  }
  return groups.filter(group => group.feature || group.cards.length);
}
