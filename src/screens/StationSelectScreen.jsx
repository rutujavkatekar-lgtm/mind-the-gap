import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { CURRENT_STATION, destinationStations } from "../data/stations";
import { SettingsIcon } from "../components/Icons";
import { TileDivider } from "../components/TilePattern";

const ITEM_HEIGHT = 46;
const VISIBLE_COUNT = 5; // odd number, center + 2 above + 2 below
const CONTAINER_HEIGHT = ITEM_HEIGHT * VISIBLE_COUNT;
const PADDING = (CONTAINER_HEIGHT - ITEM_HEIGHT) / 2;

export function StationSelectScreen({ onSelect, onOpenSettings }) {
  const scrollRef = useRef(null);
  const settleTimer = useRef(null);
  const advancedRef = useRef(false);
  const [centeredIndex, setCenteredIndex] = useState(0);

  const clampIndex = (i) =>
    Math.min(Math.max(i, 0), destinationStations.length - 1);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = clampIndex(Math.round(el.scrollTop / ITEM_HEIGHT));
    setCenteredIndex(idx);

    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      if (advancedRef.current) return;
      const settledIdx = clampIndex(Math.round(el.scrollTop / ITEM_HEIGHT));
      advancedRef.current = true;
      onSelect(destinationStations[settledIdx]);
    }, 550);
  }, [onSelect]);

  useEffect(() => {
    return () => {
      if (settleTimer.current) clearTimeout(settleTimer.current);
    };
  }, []);

  const scrollToIndex = (idx) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: idx * ITEM_HEIGHT, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35 }}
      className="flex h-full flex-col px-6 pt-14"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-wide text-accent">
            You're at
          </p>
          <h1 className="mt-1 text-[26px] font-extrabold leading-tight text-ink">
            {CURRENT_STATION}
          </h1>
        </div>
        <button
          type="button"
          aria-label="Settings"
          onClick={onOpenSettings}
          className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-surface text-ink-soft transition active:scale-95"
        >
          <SettingsIcon />
        </button>
      </div>

      <div className="mt-2 text-accent/60">
        <TileDivider />
      </div>

      <p className="mt-6 text-center text-[13px] font-medium text-ink-soft">
        Scroll to choose your destination
      </p>

      <div className="relative mt-2 flex-1">
        <div
          className="relative mx-auto"
          style={{ height: CONTAINER_HEIGHT, maxWidth: 320 }}
        >
          {/* highlight band */}
          <div
            className="pointer-events-none absolute left-0 right-0 rounded-2xl bg-accent-tint"
            style={{ top: PADDING, height: ITEM_HEIGHT }}
          />

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="no-scrollbar snap-y-mandatory relative h-full overflow-y-scroll"
            style={{ paddingTop: PADDING, paddingBottom: PADDING }}
          >
            {destinationStations.map((station, idx) => {
              const distance = Math.abs(idx - centeredIndex);
              const isCentered = distance === 0;
              const opacity = Math.max(0.22, 1 - distance * 0.32);
              const scale = isCentered ? 1 : Math.max(0.86, 1 - distance * 0.06);

              return (
                <div
                  key={station}
                  className="snap-center flex items-center justify-center px-2"
                  style={{ height: ITEM_HEIGHT }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      isCentered
                        ? (() => {
                            advancedRef.current = true;
                            onSelect(station);
                          })()
                        : scrollToIndex(idx)
                    }
                    style={{
                      opacity,
                      transform: `scale(${scale})`,
                    }}
                    className={`w-full truncate text-center transition-all duration-150 ${
                      isCentered
                        ? "text-[19px] font-bold text-ink"
                        : "text-[16px] font-medium text-ink-soft"
                    }`}
                  >
                    {station}
                  </button>
                </div>
              );
            })}
          </div>

          {/* fade masks */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-paper to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-paper to-transparent" />
        </div>
      </div>

      <p className="pb-8 text-center text-[12px] text-ink-soft/70">
        Pause on a station, or tap it, to continue
      </p>
    </motion.div>
  );
}
