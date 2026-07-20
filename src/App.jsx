import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PhoneFrame } from "./components/PhoneFrame";
import { PermissionScreen } from "./screens/PermissionScreen";
import { StationSelectScreen } from "./screens/StationSelectScreen";
import { ModeSelectScreen } from "./screens/ModeSelectScreen";
import { ReadingScreen } from "./screens/ReadingScreen";
import { ListeningScreen } from "./screens/ListeningScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { stories } from "./data/stories";
import { getJourneyMinutes } from "./data/stations";
import { pickStoryForJourney } from "./lib/match";
import { LocationPinIcon } from "./components/Icons";

const ARRIVAL_THRESHOLD_SECONDS = 60;

export default function App() {
  const [phase, setPhase] = useState("permission");
  const [destination, setDestination] = useState(null);
  const [initialStory, setInitialStory] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [history, setHistory] = useState([]);

  const journeyMinutes = destination ? getJourneyMinutes(destination) : 0;
  const isCommuting = phase === "read" || phase === "listen";

  // Live countdown of time left until the destination station, independent
  // of shuffling — this is what shuffle re-matches against and what drives
  // the arrival notification.
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const remainingMinutesRef = useRef(0);
  const arrivalNotifiedRef = useRef(false);
  const arrivalToastTimerRef = useRef(null);
  const [showArrivalToast, setShowArrivalToast] = useState(false);

  // Reset the journey clock whenever a new destination is chosen.
  useEffect(() => {
    setRemainingSeconds(journeyMinutes * 60);
    remainingMinutesRef.current = journeyMinutes;
    arrivalNotifiedRef.current = false;
    setShowArrivalToast(false);
  }, [journeyMinutes]);

  // Tick the clock only while actively reading or listening.
  useEffect(() => {
    if (!isCommuting) return undefined;
    const id = setInterval(() => {
      setRemainingSeconds((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [isCommuting]);

  // Keep the "minutes left" ref fresh for shuffle to read at click-time, and
  // fire the one-shot arrival toast once time left drops to a minute.
  useEffect(() => {
    remainingMinutesRef.current = Math.max(1, Math.ceil(remainingSeconds / 60));

    if (
      !arrivalNotifiedRef.current &&
      isCommuting &&
      remainingSeconds > 0 &&
      remainingSeconds <= ARRIVAL_THRESHOLD_SECONDS
    ) {
      arrivalNotifiedRef.current = true;
      setShowArrivalToast(true);
      if (arrivalToastTimerRef.current) clearTimeout(arrivalToastTimerRef.current);
      arrivalToastTimerRef.current = setTimeout(() => setShowArrivalToast(false), 5000);
    }
  }, [remainingSeconds, isCommuting]);

  useEffect(
    () => () => {
      if (arrivalToastTimerRef.current) clearTimeout(arrivalToastTimerRef.current);
    },
    []
  );

  const toggleBookmark = useCallback((id) => {
    if (!id) return;
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const markVisited = useCallback((id) => {
    setHistory((prev) => [id, ...prev.filter((x) => x !== id)]);
  }, []);

  const handlePermissionContinue = () => setPhase("station");

  const handleStationSelect = (station) => {
    setDestination(station);
    setPhase("mode");
  };

  const handleModeSelect = (selectedMode) => {
    const minutes = getJourneyMinutes(destination);
    const story = pickStoryForJourney(stories, minutes, selectedMode, null);
    setInitialStory(story);
    setPhase(selectedMode);
  };

  const goToSettings = () => setPhase("settings");

  const startNewJourney = () => {
    setDestination(null);
    setInitialStory(null);
    setPhase("station");
  };

  return (
    <PhoneFrame>
      <AnimatePresence mode="wait">
        {phase === "permission" && (
          <PermissionScreen key="permission" onContinue={handlePermissionContinue} />
        )}

        {phase === "station" && (
          <StationSelectScreen
            key="station"
            onSelect={handleStationSelect}
            onOpenSettings={goToSettings}
          />
        )}

        {phase === "mode" && (
          <ModeSelectScreen
            key="mode"
            destination={destination}
            onSelectMode={handleModeSelect}
            onBack={() => setPhase("station")}
          />
        )}

        {phase === "read" && initialStory && (
          <ReadingScreen
            key="read"
            initialStory={initialStory}
            journeyMinutes={journeyMinutes}
            remainingMinutesRef={remainingMinutesRef}
            bookmarks={bookmarks}
            onToggleBookmark={toggleBookmark}
            onMarkVisited={markVisited}
            onBack={() => setPhase("mode")}
          />
        )}

        {phase === "listen" && initialStory && (
          <ListeningScreen
            key="listen"
            initialStory={initialStory}
            journeyMinutes={journeyMinutes}
            remainingMinutesRef={remainingMinutesRef}
            bookmarks={bookmarks}
            onToggleBookmark={toggleBookmark}
            onMarkVisited={markVisited}
            onBack={() => setPhase("mode")}
          />
        )}

        {phase === "settings" && (
          <SettingsScreen
            key="settings"
            history={history}
            bookmarks={bookmarks}
            onToggleBookmark={toggleBookmark}
            onBack={startNewJourney}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCommuting && showArrivalToast && destination && (
          <motion.div
            key="arrival-toast"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none absolute left-4 right-4 top-4 z-20 flex items-center gap-3 rounded-2xl bg-ink px-4 py-3 shadow-lg"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper/15 text-paper">
              <LocationPinIcon width={18} height={18} />
            </span>
            <p className="text-[14px] font-semibold leading-snug text-paper">
              Arriving at {destination} in 1 min
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </PhoneFrame>
  );
}
