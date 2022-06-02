import { FC } from "react";
import { Link } from "react-router-dom";
import playingFields from "../data/playingFields";
import { useTranslate } from "react-polyglot";

/**
 * File: ChoosePage.tsx
 *
 * This file contains the page where user can
 * select whether they want to play Level 1 of the game or
 * Level 2 of the game.
 *
 * @constructor
 */
const ChoosePage: FC = () => {
    // Initialize the useTranslate() so we can access the string/text in the dictionary
  const translate = useTranslate();

  return (
      // Return choose level page
      <div className="home-page-picture">
          <div className="home-page-layover">
              <div
                  className="home-page-container"
              >
                  {/* Title */}
                  <div
                      className="home-page-title"
                  >
                      {translate("title")}
                  </div>

                  {/* The buttons that link to level 1 or level 2 */}
                  <div
                      style={{
                          textAlign: "center",
                      }}
                  >
                      <div className="home-page-buttons">
                          {playingFields.map((_, index) => (
                              <Link to={`/play/${index}`} key={index}>
                                  <button className="next-buttons home-buttons">{translate("menu.play", { index: index + 1 })}</button>
                              </Link>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      </div>

  );
};
export default ChoosePage;
