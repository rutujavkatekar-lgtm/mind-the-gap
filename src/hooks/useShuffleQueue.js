import { useState, useCallback, useMemo } from "react";
import { pickStoryForJourney } from "../lib/match";

// A single-branch session queue: Next always shuffles to a fresh piece,
// re-matched to however much journey time is left right now (never to a
// shorter default and never based on how many shuffles have happened), and
// never repeating the piece currently showing. Previous steps back through
// pieces already shown. Navigating forward after going back discards the
// old forward branch, like a browser history stack.
export function useShuffleQueue(stories, initialStory, mode, remainingMinutesRef) {
  const [queue, setQueue] = useState([initialStory]);
  const [index, setIndex] = useState(0);

  const current = queue[index];

  const next = useCallback(() => {
    setQueue((q) => {
      const trimmed = q.slice(0, index + 1);
      const remainingMinutes = remainingMinutesRef?.current ?? current.readMinutes;
      const nextStory = pickStoryForJourney(
        stories,
        remainingMinutes,
        mode,
        trimmed[trimmed.length - 1].id
      );
      return [...trimmed, nextStory];
    });
    setIndex((i) => i + 1);
  }, [stories, index, mode, remainingMinutesRef, current]);

  const previous = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  const canGoBack = index > 0;

  return useMemo(
    () => ({ current, next, previous, canGoBack }),
    [current, next, previous, canGoBack]
  );
}
