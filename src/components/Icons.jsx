const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function BackIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" {...base} {...props}>
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

export function TextSizeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="M4 18l4-11 4 11M5.5 14h5" />
      <path d="M14 18l3-8 3 8M14.8 15.5h4.4" />
    </svg>
  );
}

export function ShareIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <circle cx="18" cy="5" r="2.4" />
      <circle cx="6" cy="12" r="2.4" />
      <circle cx="18" cy="19" r="2.4" />
      <path d="M8.2 10.8l7.6-4.6M8.2 13.2l7.6 4.6" />
    </svg>
  );
}

export function BookmarkIcon({ filled, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      {...base}
      fill={filled ? "currentColor" : "none"}
      {...props}
    >
      <path d="M6.5 4.5h11a1 1 0 0 1 1 1V20l-6.5-4-6.5 4V5.5a1 1 0 0 1 1-1z" />
    </svg>
  );
}

export function ShuffleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="M3 6h3.5c1.4 0 2.7.7 3.4 1.9L14 15c.7 1.2 2 1.9 3.4 1.9H21" />
      <path d="M17.5 4.5L21 6l-3.5 1.5M17.5 19.5L21 18l-3.5-1.5" />
      <path d="M3 18h3.5c1.4 0 2.7-.7 3.4-1.9l.7-1.2" />
      <path d="M11.6 8.6L11 9.4" />
    </svg>
  );
}

export function PlayIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" {...props}>
      <path d="M7 4.5v15l13-7.5-13-7.5z" />
    </svg>
  );
}

export function PauseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" {...props}>
      <rect x="6" y="4.5" width="4.5" height="15" rx="1" />
      <rect x="13.5" y="4.5" width="4.5" height="15" rx="1" />
    </svg>
  );
}

export function Rewind15Icon(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" {...base} {...props}>
      <path d="M7 4.5L3.5 8 7 11.5" />
      <path d="M3.5 8h9.5a6.5 6.5 0 1 1-6 9" />
      <text x="7.5" y="17.5" fontSize="6.5" stroke="none" fill="currentColor" fontFamily="Manrope, sans-serif" fontWeight="700">15</text>
    </svg>
  );
}

export function Forward15Icon(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" {...base} {...props}>
      <path d="M17 4.5L20.5 8 17 11.5" />
      <path d="M20.5 8H11a6.5 6.5 0 1 0 6 9" />
      <text x="4.5" y="17.5" fontSize="6.5" stroke="none" fill="currentColor" fontFamily="Manrope, sans-serif" fontWeight="700">15</text>
    </svg>
  );
}

export function PrevTrackIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" {...props}>
      <path d="M6 5.5a1 1 0 0 1 1 1V11l10.5-6.4c.66-.4 1.5.08 1.5.86v13.1c0 .78-.84 1.25-1.5.85L7 12.9v4.6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1z" />
    </svg>
  );
}

export function NextTrackIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" {...props}>
      <path d="M18 5.5a1 1 0 0 0-1 1V11L6.5 4.6c-.66-.4-1.5.08-1.5.86v13.1c0 .78.84 1.25 1.5.85L17 12.9v4.6a1 1 0 0 0 1 1h0a1 1 0 0 0 1-1v-11a1 1 0 0 0-1-1z" />
    </svg>
  );
}

export function ChevronDownIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function SettingsIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" {...base} {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 13.5a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V19a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H4a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H10a1.6 1.6 0 0 0 1-1.5V4a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V10c.1.6.5 1.2 1.5 1.4h.1a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z" />
    </svg>
  );
}

export function LocationPinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="34" height="34" {...base} {...props}>
      <path d="M12 21s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...props}>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}
