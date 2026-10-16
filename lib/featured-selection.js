// Treat archive aliases and shared image URLs as the same work, including the
// fixed TOP images whose IDs and filenames differ from their archive versions.
export function chooseFeaturedTiles(topImages, works, sameImageGroups, random = null) {
  const top = topImages.slice(0, 5);
  const aliases = new Map();
  for (const { show, hide } of sameImageGroups) {
    for (const id of [show, ...hide]) aliases.set(id, show);
  }
  const canonical = (id) => aliases.get(id) ?? id;
  const imageKey = (src) => src.replace(/-thumb(?=\.)/, "");
  const ids = new Set(top.flatMap(w => [w.id, ...(w.archiveIds ?? [])]).map(canonical));
  const images = new Set(top.flatMap(w => [w.thumb, ...w.images]).map(imageKey));
  const hidden = new Set(sameImageGroups.flatMap(g => g.hide));
  const candidates = works.filter(w => w.sharp && !hidden.has(w.id));

  if (random) {
    for (let i = candidates.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
    }
  }

  const sides = [];
  for (const work of candidates) {
    const keys = [work.thumb, ...work.images].map(imageKey);
    if (ids.has(canonical(work.id)) || keys.some(key => images.has(key))) continue;
    sides.push(work);
    ids.add(canonical(work.id));
    keys.forEach(key => images.add(key));
    if (sides.length === 4) break;
  }
  return [top[0], sides[0], top[1], sides[1], top[2], sides[2], top[3], sides[3], top[4]].filter(Boolean);
}
