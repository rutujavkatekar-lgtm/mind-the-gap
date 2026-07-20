import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { stories } from "../data/stories";
import { useShuffleQueue } from "../hooks/useShuffleQueue";
import { BackIcon, TextSizeIcon, ShareIcon, BookmarkIcon } from "../components/Icons";

const TEXT_SIZES = [
  { label: "sm", body: "text-[15px] leading-[1.7]", title: "text-[22px]" },
  { label: "md", body: "text-[17px] leading-[1.75]", title: "text-[25px]" },
  { label: "lg", body: "text-[19px] leading-[1.8]", title: "text-[28px]" },
];

export function ReadingScreen({
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
    "read",
    remainingMinutesRef
  );
  const [sizeIdx, setSizeIdx] = useState(1);
  const [toast, setToast] = useState(null);
  const scrollRef = useRef(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    onMarkVisited(current.id);
    if (scrollRef.current) scrollRef.current.scrollTo({ top: 0 });
  }, [current.id, onMarkVisited]);

  const showToast = (message) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1800);
  };

  useEffect(() => () => toastTimer.current && clearTimeout(toastTimer.current), []);

  const size = TEXT_SIZES[sizeIdx];
  const isBookmarked = bookmarks.includes(current.id);
  const paragraphs = current.text.split("\n\n");

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35 }}
      className="relative flex h-full flex-col"
    >
      {/* top bar */}
      <div className="flex items-center justify-between px-4 pt-12 pb-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition active:scale-90"
        >
          <BackIcon />
        </button>
        <span className="text-[12px] font-semibold uppercase tracking-widest text-ink-soft">
          Reading &middot; {journeyMinutes} min
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Adjust text size"
            onClick={() => setSizeIdx((i) => (i + 1) % TEXT_SIZES.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition active:scale-90"
          >
            <TextSizeIcon />
          </button>
          <button
            type="button"
            aria-label="Share"
            onClick={() => showToast("Link copied")}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition active:scale-90"
          >
            <ShareIcon />
          </button>
          <button
            type="button"
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            onClick={() => onToggleBookmark(current.id)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-accent transition active:scale-90"
          >
            <BookmarkIcon filled={isBookmarked} />
          </button>
        </div>
      </div>

      {/* content */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 pb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mt-1 text-[13px] font-semibold uppercase tracking-wide text-accent">
              {current.category} &middot; {current.readMinutes} min read
            </p>
            <h1 className={`mt-2 font-extrabold leading-tight text-ink ${size.title}`}>
              {current.title}
            </h1>
            <p className="mt-1.5 text-[14px] font-medium text-ink-soft">
              by {current.author}
            </p>

            <div className={`mt-6 space-y-4 pb-6 text-ink ${size.body}`}>
              {paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* bottom bar */}
      <div className="flex items-center justify-between gap-3 border-t border-line bg-surface px-6 py-4">
        <button
          type="button"
          onClick={previous}
          disabled={!canGoBack}
          className="flex-1 rounded-2xl border border-line py-3 text-[14px] font-bold text-ink transition active:scale-[0.98] disabled:opacity-30"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={next}
          className="flex-1 rounded-2xl bg-accent py-3 text-[14px] font-bold text-night transition active:scale-[0.98] active:bg-accent-dark"
        >
          Next
        </button>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="pointer-events-none absolute bottom-24 left-1/2 -translate-x-1/2 rounded-full border border-line bg-surface px-4 py-2 text-[12px] font-semibold text-ink shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
