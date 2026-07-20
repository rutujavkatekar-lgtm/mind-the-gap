# Mind the Gap

A clickable front-end prototype for a mobile app that reads or narrates short stories
and essays sized to match your London Underground commute. Built with React, Tailwind
CSS, and Vite. All data (stations, journey times, stories) is mocked locally — no
backend.

## Running locally

```bash
npm install
npm run dev
```

Open the printed local URL in a phone-sized browser window (or use devtools device
emulation, ~375–428px wide) to see the intended layout.

## Build

```bash
npm run build
```

Outputs a static bundle to `dist/`.

## Flow

1. **Permission** — mock location prompt (any choice proceeds; current station is
   always Elephant & Castle).
2. **Station select** — scrollable picker-wheel to choose a destination; auto-advances
   once you settle on one.
3. **Mode select** — Read or Listen.
4. **Reading / Listening** — content length is matched to the mocked journey time.
   Bookmark, shuffle (never repeats the last piece), and step back through pieces
   you've already seen in this session.
5. **Settings** — bookmarked pieces and a passive history of titles you've opened, with
   a way back to station select to start a new session.
