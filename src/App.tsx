import React, { useState } from "react";
import Background from "./components/Background";
import PlayingField from "./components/PlayingField";
import { Locale, LocaleContext, messages } from "./i18n";
import { I18n } from "react-polyglot";

import ReactHowler from 'react-howler'

function App() {
  const [locale, setLocale] = useState<Locale>("en");

/*

<ReactHowler
            src='/sounds/background.mp3'
            preload={true}
            loop={true}
            html5={true}
            playing={true}
            volume={0.3}
            />
 */

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

           <Background />

      </I18n>
    </LocaleContext.Provider>
  );
}

export default App;
