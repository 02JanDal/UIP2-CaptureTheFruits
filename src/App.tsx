import React, { FC, useState } from "react";
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

const App: FC = () => {
  const navigate = useNavigate();

  const [locale, setLocale] = useState<Locale>("en");

  const rawLeaderboard = localStorage.getItem("leaderboard");
  const [leaderboard, setLeaderboard] = useState<Leaderboard>(
    rawLeaderboard ? deserializeLeaderboard(rawLeaderboard) : []
  );
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
      <LeaderboardContext.Provider
        value={{ leaderboard, setLeaderboard: actualSetLeaderboard }}
      >
        <I18n locale={locale} messages={messages[locale]}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/play" element={<ChoosePage />} />
            <Route path="/play/:id" element={<PlayPage />} />
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
            <Route path="/after-game" element={<AfterGamePage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
          </Routes>
        </I18n>
      </LeaderboardContext.Provider>
    </LocaleContext.Provider>
  );
};

export default App;
