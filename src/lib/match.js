// Picks the story whose estimated duration for the given mode is closest
// to the journey time, optionally excluding a story (e.g. the one just shown).
export function pickStoryForJourney(stories, journeyMinutes, mode, excludeId) {
  const pool = stories.filter((s) => s.id !== excludeId);
  const candidates = pool.length ? pool : stories;
  const key = mode === "listen" ? "listenMinutes" : "readMinutes";

  return candidates.reduce((best, s) => {
    const diff = Math.abs(s[key] - journeyMinutes);
    const bestDiff = Math.abs(best[key] - journeyMinutes);
    return diff < bestDiff ? s : best;
  }, candidates[0]);
}
