import { motion } from "framer-motion";
import { BackIcon } from "../components/Icons";
import { TileDivider } from "../components/TilePattern";
import { getJourneyMinutes } from "../data/stations";

export function ModeSelectScreen({ destination, onSelectMode, onBack }) {
  const minutes = getJourneyMinutes(destination);

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35 }}
      className="flex h-full flex-col px-6 pt-14"
    >
      <button
        type="button"
        onClick={onBack}
        aria-label="Back"
        className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full text-ink transition active:scale-90"
      >
        <BackIcon />
      </button>

      <div className="mt-3">
        <p className="text-[13px] font-semibold uppercase tracking-wide text-accent">
          {minutes} min to {destination}
        </p>
        <h1 className="mt-1 text-[26px] font-extrabold leading-tight text-ink">
          How do you want it?
        </h1>
        <div className="mt-4 max-w-16 text-accent/60">
          <TileDivider />
        </div>
      </div>

      <div className="mt-10 flex flex-1 flex-col gap-4 pb-10">
        <button
          type="button"
          onClick={() => onSelectMode("read")}
          className="group flex flex-1 flex-col items-center justify-center rounded-3xl border border-line bg-surface transition active:scale-[0.98] active:bg-tile"
        >
          <span className="text-[34px] font-extrabold tracking-tight text-ink">
            Read
          </span>
          <span className="mt-2 text-[13px] font-medium text-ink-soft">
            A story sized to your journey
          </span>
        </button>

        <button
          type="button"
          onClick={() => onSelectMode("listen")}
          className="group flex flex-1 flex-col items-center justify-center rounded-3xl bg-ink transition active:scale-[0.98]"
        >
          <span className="text-[34px] font-extrabold tracking-tight text-paper">
            Listen
          </span>
          <span className="mt-2 text-[13px] font-medium text-paper/70">
            Narrated for the ride
          </span>
        </button>
      </div>
    </motion.div>
  );
}
