import React, { FC, useState } from "react";
import PlayingField from "./components/PlayingField";
import { Locale, LocaleContext, messages } from "./i18n";
import { I18n } from "react-polyglot";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import playingFields from "./data/playingFields";
import { PlayPage } from "./pages/PlayPage";
import ChoosePage from "./pages/ChoosePage";

const App: FC = () => {
  const [locale, setLocale] = useState<Locale>("en");

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
      <I18n locale={locale} messages={messages[locale]}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/play" element={<ChoosePage />} />
          <Route path="/play/:id" element={<PlayPage />} />
          <Route
            path="/tutorial"
            element={<PlayingField field={playingFields[0]} showTutorial />}
          />
        </Routes>
      </I18n>
    </LocaleContext.Provider>
  );
};

export default App;
