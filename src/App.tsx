import React, { useState } from "react";
import PlayingField from "./components/PlayingField";
import { Locale, LocaleContext, messages } from "./i18n";
import { I18n } from "react-polyglot";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route, } from "react-router-dom";

function App() {
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
              <Route path="/" element={<Home/>}/>
              <Route path="/play" element={<PlayingField/>}/>
          </Routes>
      </I18n>
    </LocaleContext.Provider>
  );
}

export default App;
