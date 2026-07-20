// A quiet nod to Underground ceramic tile motifs: a thin repeating band
// of interlocking lozenges, used as a low-key divider/texture accent.
export function TileDivider({ className = "" }) {
  return (
    <svg
      className={className}
      width="100%"
      height="10"
      viewBox="0 0 120 10"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <pattern id="tileDividerPattern" width="20" height="10" patternUnits="userSpaceOnUse">
        <path
          d="M0 5 L5 0 L10 5 L5 10 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.9"
        />
        <path
          d="M10 5 L15 0 L20 5 L15 10 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.9"
        />
      </pattern>
      <rect width="120" height="10" fill="url(#tileDividerPattern)" />
    </svg>
  );
}

// A faint full-field tile texture, meant to sit behind a header at very
// low opacity so it reads as texture rather than pattern.
export function TileField({ className = "" }) {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <pattern id="tileFieldPattern" width="28" height="28" patternUnits="userSpaceOnUse">
        <rect width="28" height="28" fill="none" />
        <path
          d="M14 1 L27 14 L14 27 L1 14 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
        />
      </pattern>
      <rect width="100%" height="100%" fill="url(#tileFieldPattern)" />
    </svg>
  );
}
