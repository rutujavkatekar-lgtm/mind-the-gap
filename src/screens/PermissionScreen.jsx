import { useState } from "react";
import { motion } from "framer-motion";
import { LocationPinIcon } from "../components/Icons";
import { TileDivider } from "../components/TilePattern";

export function PermissionScreen({ onContinue }) {
  const [showWhy, setShowWhy] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="flex h-full flex-col justify-between px-6 pb-8 pt-16"
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-accent-tint text-accent">
          <LocationPinIcon />
        </div>
        <h1 className="text-[28px] font-extrabold leading-tight text-ink">
          Allow access to
          <br />
          location?
        </h1>
        <p className="mt-3 max-w-[26ch] text-[15px] leading-snug text-ink-soft">
          Mind the Gap uses your station to time stories to your journey.
        </p>
        <div className="mt-8 w-16 text-accent/70">
          <TileDivider />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => onContinue("allow")}
          className="w-full rounded-2xl bg-accent py-4 text-[16px] font-bold text-paper transition active:scale-[0.98] active:bg-accent-dark"
        >
          Allow
        </button>
        <button
          type="button"
          onClick={() => onContinue("once")}
          className="w-full rounded-2xl border border-line bg-surface py-4 text-[16px] font-semibold text-ink transition active:scale-[0.98] active:bg-tile"
        >
          Allow only this time
        </button>
        <button
          type="button"
          onClick={() => onContinue("deny")}
          className="w-full rounded-2xl py-4 text-[16px] font-semibold text-ink-soft transition active:scale-[0.98]"
        >
          Do not allow
        </button>

        <div className="mt-2 text-center">
          <button
            type="button"
            onClick={() => setShowWhy((v) => !v)}
            className="text-[13px] font-medium text-ink-soft underline decoration-line underline-offset-4"
          >
            Why do we need access?
          </button>
          {showWhy && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.25 }}
              className="mx-auto mt-3 max-w-[30ch] overflow-hidden text-[13px] leading-relaxed text-ink-soft"
            >
              To match content to your journey time automatically — nothing is
              stored or shared.
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
