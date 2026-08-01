import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { typographyBlocks as blocks } from "../data/typographyBlocks";
import { BackIcon } from "../components/Icons";

// Splits `text` around the first occurrence of `accentWord` and wraps it in
// the script accent font, mirroring the "one word styled differently" look
// from the reference layouts.
function renderAccented(text, accentWord) {
  if (!accentWord) return text;
  const idx = text.indexOf(accentWord);
  if (idx === -1) return text;
  const before = text.slice(0, idx);
  const after = text.slice(idx + accentWord.length);
  return (
    <>
      {before}
      <span className="font-script text-[1.3em] font-normal">{accentWord}</span>
      {after}
    </>
  );
}

export function TypographyFeedScreen({ onBack }) {
  const scrollRef = useRef(null);
  const blockRefs = useRef([]);
  const [stops, setStops] = useState(null);

  const { scrollY } = useScroll({ container: scrollRef });

  useLayoutEffect(() => {
    const container = scrollRef.current;
    if (!container) return undefined;

    function measure() {
      const containerTop = container.getBoundingClientRect().top;
      const tops = blockRefs.current.map((el, i) => {
        if (!el) return i * container.clientHeight;
        return el.getBoundingClientRect().top - containerTop + container.scrollTop;
      });
      // useTransform requires a strictly increasing input range — fall back
      // to evenly spaced stops if layout hasn't settled yet (e.g. fonts
      // still swapping in).
      const isMonotonic = tops.every((v, i) => i === 0 || v > tops[i - 1]);
      setStops(isMonotonic ? tops : tops.map((_, i) => i * container.clientHeight));
    }

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(container);
    document.fonts?.ready.then(measure);

    return () => resizeObserver.disconnect();
  }, []);

  const fallbackStops = blocks.map((_, i) => i * 800);
  const colors = blocks.map((b) => b.color);
  const background = useTransform(scrollY, stops ?? fallbackStops, colors);

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35 }}
      style={{ backgroundColor: background }}
      className="relative flex h-full flex-col"
    >
      <div className="absolute left-0 right-0 top-0 z-10 flex items-center px-4 pt-12 pb-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition active:scale-90"
        >
          <BackIcon />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="no-scrollbar flex-1 overflow-y-auto"
      >
        {blocks.map((block, i) => (
          <div
            key={block.id}
            ref={(el) => (blockRefs.current[i] = el)}
            className="flex min-h-full flex-col justify-center px-7 py-24"
          >
            {block.eyebrow && (
              <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.2em] text-white/50">
                {block.eyebrow}
              </p>
            )}
            <p className="font-feed mt-5 text-[34px] font-bold leading-[1.28] text-white">
              {renderAccented(block.text, block.accentWord)}
            </p>
          </div>
        ))}
      </div>

      <p className="pointer-events-none absolute bottom-6 left-7 z-10 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
        Mind the Gap
      </p>
    </motion.div>
  );
}
