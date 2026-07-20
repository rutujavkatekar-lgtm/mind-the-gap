import { useState, useCallback, useMemo } from "react";
import { pickRandomExcluding } from "../lib/match";

// A single-branch session queue: Next always shuffles to a fresh random
// piece (never repeating the piece currently showing); Previous steps back
// through pieces already shown. Navigating forward after going back
// discards the old forward branch, like a browser history stack.
export function useShuffleQueue(stories, initialStory) {
  const [queue, setQueue] = useState([initialStory]);
  const [index, setIndex] = useState(0);

  const current = queue[index];

  const next = useCallback(() => {
    setQueue((q) => {
      const trimmed = q.slice(0, index + 1);
      const nextStory = pickRandomExcluding(stories, trimmed[trimmed.length - 1].id);
      return [...trimmed, nextStory];
    });
    setIndex((i) => i + 1);
  }, [stories, index]);

  const previous = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  const canGoBack = index > 0;

  return useMemo(
    () => ({ current, next, previous, canGoBack }),
    [current, next, previous, canGoBack]
  );
}
