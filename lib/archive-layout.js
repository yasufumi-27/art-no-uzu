import { ARCHIVE_ADDITIONS } from "./archive-additions";
import { asset } from "./asset";

// 固定の年別優先枠。通常カードは元の順序を保ち、各枠の下へ流す。
export const ARCHIVE_FEATURES = {
  2015: [{ id: "2015_1", label: "一番最初に描いた渦" }, { id: "2015_2", label: "泳ぐ戦闘機" }],
  2016: [{ id: "2016_6", label: "Superfly 「Into The Circle」衣装　Paintig" }, { id: "2016_1", label: "Schön! Magazine Paintig" }],
  2017: [{ id: "2017_13", label: "村上虹郎 Body Paintig" }, { id: "2017_9", label: "「破壊と再生と破壊」" }, { id: "2017_17", label: "2017年の作品" }, { id: "2017_18", label: "2017年の作品" }],
  2018: [{ id: "2018_4", label: "渦展 Vol.１", fixedCardImages: ["2018_4_30","2018_4_18","2018_4_8","2018_4_13","2018_4_23","2018_4_19","2018_4_29","2018_4_4"] }, { id: "2018_9", label: "映画「猫は抱くもの」衣装painting" }, { id: "2018_24", label: "南沙良　衣装提供" }, { id: "2018_12", label: "［vol.1］ starring Sawa Nimura", fixedCardImages: ["2018_12_8","2018_12_9","2018_12_10","2018_12_11","2018_12_12","2018_12_13","2018_12_14","2018_12_15"] }, { id: "2018_14", label: "［vol.2］ starring Hiroto Oshita", imageNumber: 2, fixedCardImages: ["2018_14_8","2018_14_9","2018_14_10","2018_14_11","2018_14_12","2018_14_13","2018_14_14","2018_14_15"] }, { id: "2018_16", label: "［vol.3］ starring Lisa Oda", fixedCardImages: ["2018_16_6","2018_16_7","2018_16_8","2018_16_9","2018_16_10","2018_16_11","2018_16_12","2018_16_13"] }, { id: "2018_23", label: "［vol.4］ starring KINARI", fixedCardImages: ["2018_23_5","2018_23_9","2018_23_3","2018_23_11","2018_23_7","2018_23_4","2018_23_10","2018_23_6"] }, { id: "2018_2", label: "渦を描き続けて４年目の渦", imageSource: "/images/works/additions/2018-fourth-year-20261026.webp" }],
  2019: [{ id: "2019_1", label: "渦展 Vol.2", cardImages: ["2019_3", "2019_4"], imageNumber: 3 }, { id: "2019_9", label: "EYESCREAM Paris et Tourbillon vol.1", fillFromImages: true }, { id: "2019_10", label: "EYESCREAM Paris et Tourbillon vol.2", fillFromImages: true }, { id: "2019_11", label: "EYESCREAM Paris et Tourbillon vol.3", fillFromImages: true }, { id: "2019-addition-01", label: "BATTLE STREET　衣装PAINTING" }],
  2020: [{ id: "2020_4", label: "白石聖 写真展「COLOR」衣装提供", imageSource: "/images/works/2020/shiraishi-feature-20261023.webp", objectPosition: "center top" }, { id: "2020_1", label: "EYESCREAM Paris et Tourbillon vol.4", fillFromImages: true }, { id: "2020_2", label: "EYESCREAM Paris et Tourbillon vol.5", fillFromImages: true }, { id: "2020_3", label: "EYESCREAM Paris et Tourbillon vol.6", fillFromImages: true }],
  2021: [{ id: "2021_1", label: "月の渦" }],
  2022: [{ id: "2022_6", label: "「いい人間の教科書」衣装提供" }],
  2023: [{ id: "2023_2", label: "NIKE AIR FORCE 1" }, { id: "2023_1", label: "PSG（パリ・サンジェルマンFC）コラボ" }, { id: "2023_11", label: "この世界を廻すのは。" }, { id: "2023_12", label: "TEARS" }],
  2024: [{ id: "2024_1", label: "渦展 Vol.3", fixedCardImages: ["2024_1_3", "2024_1_5", "2024_1_6", "2024_1_10", "2024_1_9", "2024_1_4", "2024_1_8", "2024_1_2"] }, { id: "2024_5", label: "『渦展 VOL.3』作品集", imageNumber: 12, objectPosition: "center 20%" }],
  2025: [{ id: "2025_1", label: "渦に沈む", fixedCardImages: ["2025_1_16", "2025_1_13", "2025_1_5", "2025_1_18", "2025_1_21", "2025_1_12", "2025_1_4", "2025_1_8"] }, { id: "2025_4", label: "個展「生まれた喜び」" }, { id: "2025_5", label: "『生まれた喜び』作品集", book: true, imageSource: "/images/works/2025/2025_5_25.webp" }, { id: "2025_2", label: "SEKAI NO OWARI", imageNumber: 3 }],
  2026: [{ id: "2026_17", label: "SHINFULA × YOSHIMI KAMITANI" }, { id: "2026_8", label: "夜を泳ぐ海月", excludedCardImages: ["2026_8"], imageSource: "/images/works/2026/jellyfish-feature-20261022.webp", objectPosition: "center 25%" }],
};

// 小グリッド専用の表示写真。詳細ページの写真順は保持する。
const ARCHIVE_CARD_IMAGES = {
  "2025_3": "/images/works/2025/popup-card-20261022.webp",
};

export function archiveGroups(items, extras, year) {
  const features = (ARCHIVE_FEATURES[year] || []).map(config => {
    const work = items.find(w => w.id === config.id) || ARCHIVE_ADDITIONS.find(w => w.id === config.id && w.year === year);
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
    ...items.filter(w => !featureIds.has(w.id) && !["2025_16", "2024_6", "2024_7", "2021_8"].includes(w.id)).map(work => ({ key: work.id, work, ...(ARCHIVE_CARD_IMAGES[work.id] ? { image: asset(ARCHIVE_CARD_IMAGES[work.id]) } : {}) })),
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
  for (const work of ARCHIVE_ADDITIONS.filter(work => work.year === year && work.id !== "2023-addition-20" && !featureIds.has(work.id))) {
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
      const selected = [2, 1, 6, 8].map(number => ({
        key: `sekai-${number}`, work,
        image: asset(number === 8 ? "/images/works/additions/2025-sekai-card-20261026.webp" : `/images/works/2025/2025_2_${number}.webp`),
      }));
      const atami = [1, 4, 3, 2].map(number => ({
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
  // 生まれた喜びの右下は、展示写真から重複を避けてランダム選定した1枚で補う。
  if (year === 2025) {
    const group = groups.find(group => group.feature?.id === "2025_4");
    const image = group?.feature.work.images.find(src => src.endsWith("/2025_4_19.webp"));
    const inUse = new Set(groups.flatMap(g => [g.feature?.image, ...g.cards.map(c => c.image || c.work?.thumb || c.extra?.image)]).filter(Boolean).map(imageKey));
    if (group && group.cards.length === 7 && image && !inUse.has(imageKey(image))) {
      group.cards.push({ key: "2025_4:fill-19", work: group.feature.work, image });
      group.missing = 0;
    }
  }
  // NIKEのコラボ写真を8枚の先頭へ移動し、ほかの写真の順序は保つ。
  if (year === 2023) {
    const group = groups.find(group => group.feature?.id === "2023_2");
    const index = group?.cards.findIndex(card => card.work?.id === "2023_2") ?? -1;
    if (index > 0) group.cards.unshift(...group.cards.splice(index, 1));
  }
  // 2017年の受領セットは指定された大画像の直下に、指定順でまとめる。
  if (year === 2017) {
    const allCards = groups.flatMap(group => group.cards);
    const additionId = n => `2017-addition-20261025-${n}`;
    const selected = numbers => numbers.flatMap(n => allCards.filter(card => card.key === additionId(n)));
    const assignments = {
      "2017_17": selected([4, 5, 6, 7, 8, 9, 10, 11]),
      "2017_18": selected([12, 13, 14, 15, 16, 17, 18, 19]),
    };
    const intro = selected([1, 2, 3]);
    const assigned = new Set([...intro, ...Object.values(assignments).flat()].map(card => card.key));
    const remaining = allCards.filter(card => !assigned.has(card.key));
    const result = groups.filter(group => group.feature).map(group => {
      const id = group.feature.work.id;
      const cards = assignments[id] || (id === "2017_13" ? [...intro, ...remaining.splice(0, 8 - intro.length)] : remaining.splice(0, 8));
      return { ...group, cards, missing: 8 - cards.length };
    });
    for (let offset = 0; offset < remaining.length; offset += 8) result.push({ feature: null, cards: remaining.slice(offset, offset + 8) });
    return result;
  }
  // 2024年は展示・作品集の8枚を保持し、追加の大グリッド2枠へ16枚を配分する。
  if (year === 2024) {
    const baseGroups = groups.filter(group => ["2024_1", "2024_5"].includes(group.feature?.work?.id));
    const additions = ARCHIVE_ADDITIONS.filter(work => work.year === 2024);
    const cards = [
      ...additions.filter(work => !["2024-addition-13", "2024-addition-14"].includes(work.id)).map(work => ({ key: work.id, work })),
      ...["2024_6", "2024_7"].flatMap(id => {
        const work = items.find(item => item.id === id);
        return work ? [{ key: id, work }] : [];
      }),
      ...additions.filter(work => ["2024-addition-13", "2024-addition-14"].includes(work.id)).map(work => ({ key: work.id, work })),
    ];
    for (const [index, id] of ["2024_2", "2024_4"].entries()) {
      const work = items.find(item => item.id === id);
      if (!work) continue;
      const selected = cards.slice(index * 8, (index + 1) * 8);
      baseGroups.push({ feature: { id, work, label: work.title, image: work.images[0] }, cards: selected, missing: 8 - selected.length });
    }
    for (let offset = 16; offset < cards.length; offset += 8) baseGroups.push({ feature: null, cards: cards.slice(offset, offset + 8) });
    return baseGroups;
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
