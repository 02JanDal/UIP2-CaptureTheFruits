import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslate } from "react-polyglot";
import { LocaleContext } from "../i18n";
import SoundButton from "../components/SoundButton";

/**
 * File: HomePage.tsx
 *
 * This file contains the home page or the
 * landing page that the user will see when they
 * start playing the game.
 *
 * @constructor The HomePage file
 */
const HomePage: FC = () => {
  // Initializing useTranslate() that will be used to access the text/strings in the dictionary
  const translate = useTranslate();

  // Set the current local language
  const { setLocale } = useContext(LocaleContext)!;

  return (
    <div className="home-page-picture">
      <div className="home-page-layover">
        <div className="home-page-container">

          {/* Title */}
          <div className="home-page-title">{translate("title")}</div>
          <div
            style={{
              textAlign: "center",
            }}
          >

            {/* Home page buttons */}
            <div className="home-page-buttons">
              {/* Link to start the game */}
              <Link to="/play">
                <button className="next-buttons home-buttons">
                  {translate("menu.playNow")}
                </button>
              </Link>

              {/* Link to start the tutorial */}
              <Link to="/tutorial">
                <button className="next-buttons home-buttons">
                  {translate("menu.tutorial")}
                </button>
              </Link>

              {/* Link to see the leaderboard */}
              <Link to="/leaderboard">
                <button className="next-buttons home-buttons">
                  {translate("leaderboard.title")}
                </button>
              </Link>
            </div>

            {/* Button to change the language to English */}
            <button
              className="next-buttons home-buttons"
              onClick={() => setLocale("en")}
            >
              {translate("menu.setEnglish")}
            </button>

            {/* Button to change the language to Swedish */}
            <button
              className="next-buttons home-buttons"
              onClick={() => setLocale("sv")}
            >
              {translate("menu.setSwedish")}
            </button>
            {/* The SoundButton */}
            <SoundButton />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
