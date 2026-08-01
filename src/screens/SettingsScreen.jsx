import { motion } from "framer-motion";
import { stories } from "../data/stories";
import { BackIcon, BookmarkIcon } from "../components/Icons";
import { TileDivider } from "../components/TilePattern";

function titleFor(id) {
  const story = stories.find((s) => s.id === id);
  return story ? { title: story.title, author: story.author } : null;
}

export function SettingsScreen({ history, bookmarks, onToggleBookmark, onBack, onOpenFeed }) {
  const historyItems = history.map(titleFor).filter(Boolean);
  const bookmarkedItems = bookmarks.map(titleFor).filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35 }}
      className="flex h-full flex-col px-6 pt-14"
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full text-ink transition active:scale-90"
        >
          <BackIcon />
        </button>
        <h1 className="text-[22px] font-extrabold text-ink">Settings</h1>
      </div>

      <div className="mt-3 text-ink-soft/35">
        <TileDivider />
      </div>

      <div className="mt-6 flex-1 overflow-y-auto pb-8">
        <section>
          <h2 className="text-[13px] font-bold uppercase tracking-wide text-ink-soft">
            Bookmarked
          </h2>
          {bookmarkedItems.length === 0 ? (
            <p className="mt-3 text-[14px] text-ink-soft/70">
              Nothing bookmarked yet.
            </p>
          ) : (
            <ul className="mt-3 divide-y divide-line">
              {bookmarkedItems.map((item, i) => (
                <li key={i} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-[15px] font-semibold text-ink">
                      {item.title}
                    </p>
                    <p className="text-[13px] text-ink-soft">by {item.author}</p>
                  </div>
                  <button
                    type="button"
                    aria-label="Remove bookmark"
                    onClick={() =>
                      onToggleBookmark(
                        stories.find((s) => s.title === item.title)?.id
                      )
                    }
                    className="text-accent"
                  >
                    <BookmarkIcon filled />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-9">
          <h2 className="text-[13px] font-bold uppercase tracking-wide text-ink-soft">
            History
          </h2>
          {historyItems.length === 0 ? (
            <p className="mt-3 text-[14px] text-ink-soft/70">
              Nothing read or heard yet.
            </p>
          ) : (
            <ul className="mt-3 divide-y divide-line">
              {historyItems.map((item, i) => (
                <li key={i} className="py-3">
                  <p className="text-[15px] font-semibold text-ink">
                    {item.title}
                  </p>
                  <p className="text-[13px] text-ink-soft">by {item.author}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        {onOpenFeed && (
          <section className="mt-9">
            <h2 className="text-[13px] font-bold uppercase tracking-wide text-ink-soft">
              Preview
            </h2>
            <button
              type="button"
              onClick={onOpenFeed}
              className="mt-3 w-full rounded-2xl border border-line py-3 text-[14px] font-bold text-ink transition active:scale-[0.98]"
            >
              Typography feed (in progress)
            </button>
          </section>
        )}
      </div>

      <button
        type="button"
        onClick={onBack}
        className="mb-8 w-full rounded-2xl bg-accent py-4 text-[16px] font-bold text-night transition active:scale-[0.98] active:bg-accent-dark"
      >
        Start a new journey
      </button>
    </motion.div>
  );
}
