import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
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

export default function App() {
  const [phase, setPhase] = useState("permission");
  const [destination, setDestination] = useState(null);
  const [initialStory, setInitialStory] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [history, setHistory] = useState([]);

  const toggleBookmark = useCallback((id) => {
    if (!id) return;
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const markVisited = useCallback((id) => {
    setHistory((prev) => [id, ...prev.filter((x) => x !== id)]);
  }, []);

  const journeyMinutes = destination ? getJourneyMinutes(destination) : 0;

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
    </PhoneFrame>
  );
}
