import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { stories } from "../data/stories";
import { useShuffleQueue } from "../hooks/useShuffleQueue";
import { TileField } from "../components/TilePattern";
import {
  BackIcon,
  BookmarkIcon,
  ShuffleIcon,
  PlayIcon,
  PauseIcon,
  Rewind15Icon,
  Forward15Icon,
  PrevTrackIcon,
  NextTrackIcon,
} from "../components/Icons";

const SPEEDS = [1, 1.25, 1.5];

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function ListeningScreen({
  initialStory,
  journeyMinutes,
  remainingMinutesRef,
  bookmarks,
  onToggleBookmark,
  onMarkVisited,
  onBack,
}) {
  const { current, next, previous, canGoBack } = useShuffleQueue(
    stories,
    initialStory,
    "listen",
    remainingMinutesRef
  );
  const [isPlaying, setIsPlaying] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [speedIdx, setSpeedIdx] = useState(0);
  const intervalRef = useRef(null);

  const duration = current.listenMinutes * 60;
  const speed = SPEEDS[speedIdx];

  useEffect(() => {
    onMarkVisited(current.id);
    setElapsed(0);
    setIsPlaying(true);
  }, [current.id, onMarkVisited]);

  useEffect(() => {
    if (!isPlaying) return undefined;
    intervalRef.current = setInterval(() => {
      setElapsed((e) => {
        const nextVal = e + speed;
        if (nextVal >= duration) {
          setIsPlaying(false);
          return duration;
        }
        return nextVal;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, speed, duration]);

  const isBookmarked = bookmarks.includes(current.id);
  const progressPct = duration ? Math.min(100, (elapsed / duration) * 100) : 0;

  const seek = (value) => setElapsed(Math.min(duration, Math.max(0, value)));

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35 }}
      className="flex h-full flex-col px-6"
    >
      <div className="flex items-center justify-between pt-12 pb-2">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full text-ink transition active:scale-90"
        >
          <BackIcon />
        </button>
        <span className="text-[12px] font-semibold uppercase tracking-widest text-ink-soft">
          Listening &middot; {journeyMinutes} min
        </span>
        <div className="w-10" />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="flex w-full flex-col items-center"
          >
            <div className="relative h-56 w-56 overflow-hidden rounded-3xl border-2 border-accent bg-tile">
              <TileField className="h-full w-full text-ink-soft/15" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[15px] font-bold uppercase tracking-widest text-accent/70">
                  {current.category}
                </span>
              </div>
            </div>

            <p className="mt-7 text-[13px] font-semibold uppercase tracking-wide text-accent">
              {current.listenMinutes} min listen
            </p>
            <h1 className="mt-1 max-w-[26ch] text-center text-[24px] font-extrabold leading-tight text-ink">
              {current.title}
            </h1>
            <p className="mt-1.5 text-[14px] font-medium text-ink-soft">
              by {current.author}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-7 flex items-center gap-8">
          <button
            type="button"
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            onClick={() => onToggleBookmark(current.id)}
            className="text-accent transition active:scale-90"
          >
            <BookmarkIcon filled={isBookmarked} />
          </button>
          <button
            type="button"
            aria-label="Shuffle to another piece"
            onClick={next}
            className="text-ink transition active:scale-90"
          >
            <ShuffleIcon />
          </button>
          <button
            type="button"
            aria-label="Playback speed"
            onClick={() => setSpeedIdx((i) => (i + 1) % SPEEDS.length)}
            className="min-w-[38px] rounded-full border border-line px-2 py-1 text-[12px] font-bold text-ink transition active:scale-95"
          >
            {speed}x
          </button>
        </div>
      </div>

      <div className="pb-4">
        <input
          type="range"
          min={0}
          max={duration}
          value={elapsed}
          onChange={(e) => seek(Number(e.target.value))}
          className="w-full accent-accent"
          style={{
            background: `linear-gradient(to right, var(--color-accent) ${progressPct}%, var(--color-line) ${progressPct}%)`,
          }}
          aria-label="Seek"
        />
        <div className="mt-1 flex justify-between text-[11px] font-medium text-ink-soft">
          <span>{formatTime(elapsed)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pb-10">
        <button
          type="button"
          aria-label="Previous piece"
          onClick={previous}
          disabled={!canGoBack}
          className="flex h-11 w-11 items-center justify-center text-ink transition active:scale-90 disabled:opacity-30"
        >
          <PrevTrackIcon />
        </button>
        <button
          type="button"
          aria-label="Rewind 15 seconds"
          onClick={() => seek(elapsed - 15)}
          className="flex h-11 w-11 items-center justify-center text-ink transition active:scale-90"
        >
          <Rewind15Icon />
        </button>
        <button
          type="button"
          aria-label={isPlaying ? "Pause" : "Play"}
          onClick={() => setIsPlaying((p) => !p)}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-night shadow-md transition active:scale-95"
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon className="ml-0.5" />}
        </button>
        <button
          type="button"
          aria-label="Forward 15 seconds"
          onClick={() => seek(elapsed + 15)}
          className="flex h-11 w-11 items-center justify-center text-ink transition active:scale-90"
        >
          <Forward15Icon />
        </button>
        <button
          type="button"
          aria-label="Next piece"
          onClick={next}
          className="flex h-11 w-11 items-center justify-center text-ink transition active:scale-90"
        >
          <NextTrackIcon />
        </button>
      </div>
    </motion.div>
  );
}
