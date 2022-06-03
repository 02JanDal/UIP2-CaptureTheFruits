import React, { FC, useEffect, useState } from "react";
import PlayingField from "./components/PlayingField";
import { Locale, LocaleContext, messages } from "./i18n";
import { I18n } from "react-polyglot";
import HomePage from "./pages/HomePage";
import { Route, Routes, useNavigate } from "react-router-dom";
import playingFields from "./data/playingFields";
import { PlayPage } from "./pages/PlayPage";
import ChoosePage from "./pages/ChoosePage";
import { AfterGamePage } from "./pages/AfterGamePage";
import {
  deserializeLeaderboard,
  Leaderboard,
  LeaderboardContext,
  serializeLeaderboard,
} from "./leaderboard";
import LeaderboardPage from "./pages/LeaderboardPage";
import { LoseGamePage } from "./pages/LoseGamePage";
import { SoundContext } from "./sound";
import ReactHowler from "react-howler";

/**
 * File: App.tsx
 *
 * This file contains "the index" that executes
 * all the pages in the gaming app.
 *
 * @constructor
 */
const App: FC = () => {
  // Initialize the useNavigate() to navigate to different pages
  const navigate = useNavigate();

  // Setting the local language to English
  const [locale, setLocale] = useState<Locale>("en");

  // Setting background music is muted to true, initially
  const [muted, setMuted] = useState(true);
  // Continuously checks whether the state of the background music has changed
  useEffect(() => {
    Howler.mute(muted);
  }, [muted]);

  // Get the current leaderboard from the local storage
  const rawLeaderboard = localStorage.getItem("leaderboard");

  // The getter and setter for the leaderboard. If there is a leaderboard,
  // it will be set to the current leaderboard. If there is no leaderboard.
  // If there is no leaderboard value yet, then it will return an empty array.
  const [leaderboard, setLeaderboard] = useState<Leaderboard>(
    rawLeaderboard ? deserializeLeaderboard(rawLeaderboard) : []
  );

  // Setting the leaderboard
  const actualSetLeaderboard = (lb: Leaderboard) => {
    localStorage.setItem("leaderboard", serializeLeaderboard(lb));
    setLeaderboard(lb);
  };

  return (
    /* Contexts are a way to "pass down" properties without having to
     * explicitly specify for each component. Instead, we can specify
     * them once here and later call useContext(LocaleContext) to get
     * access to these properties anywhere in the tree. That way we can
     * get access to setLocale in a button, for example.
     *
     * I18n does basically the same thing under the hood with the messages
     * object.
     */
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {/* Setting the leaderboard */}
      <LeaderboardContext.Provider
        value={{ leaderboard, setLeaderboard: actualSetLeaderboard }}
      >
        {/* Setting the sound/backsound music */}
        <SoundContext.Provider value={{ muted, setMuted }}>
          {/* Setting the background music using ReactHowler */}
          <ReactHowler
            src="sounds/background.mp3"
            preload={true}
            loop={true}
            html5={true}
            playing={true}
            volume={0.07}
          />
          <I18n locale={locale} messages={messages[locale]}>
            {/* Using React Router to route to different pages */}
            <Routes>
              {/* Route to home page */}
              <Route path="/" element={<HomePage />} />
              {/* Route to choose page */}
              <Route path="/play" element={<ChoosePage />} />
              {/* Route to play page, depending on which level */}
              <Route path="/play/:id" element={<PlayPage />} />
              {/* Route to tutorial page */}
              <Route
                path="/tutorial"
                element={
                  <PlayingField
                    field={playingFields[0]}
                    showTutorial
                    onFinished={() => navigate("/")}
                  />
                }
              />
              {/* Route to after game page */}
              <Route path="/after-game" element={<AfterGamePage />} />
              {/* Route to game lost page */}
              <Route path="/lose-game" element={<LoseGamePage />} />
              {/* Route to leaderboard page */}
              <Route path="/leaderboard" element={<LeaderboardPage />} />
            </Routes>
          </I18n>
        </SoundContext.Provider>
      </LeaderboardContext.Provider>
    </LocaleContext.Provider>
  );
};

export default App;
