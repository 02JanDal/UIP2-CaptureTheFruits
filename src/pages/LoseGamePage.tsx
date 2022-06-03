import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useTranslate } from "react-polyglot";
import ReactHowler from "react-howler";
import { HOWLER_VOLUME } from "../settings";

/**
 * File: LoseGamePage.tsx
 *
 * This file contains the page that will be shown
 * if a user lost the game (lost all three lives).
 * It will prompt them to either restart the game
 * or go back to the main page.
 *
 * @constructor The LoseGamePage file
 */
export const LoseGamePage: FC = () => {
  // Initialize the useTranslate() function that will be used to access the text/strings in the dictionary
  const translate = useTranslate();

  return (
    // Display the game lost page
    <div className="home-page-picture">
      {/* Play the sound of when the user lost the game */}
      <ReactHowler
        src="sounds/gameOver.wav"
        preload={true}
        html5={true}
        loop={false}
        playing={true}
        volume={HOWLER_VOLUME}
      />
      <div className="home-page-layover">
        <div className="home-page-container end-page-container">
          {/* The title  */}
          <div className="home-page-title" style={{ marginBottom: 20 }}>
            {translate("loseGame.title")}
          </div>
          <div style={{ fontSize: 20, fontFamily: "sans-serif" }}>
            {translate("loseGame.playAgain")}
          </div>
          <div
            style={{
              textAlign: "center",
            }}
          >
            {/* The button back to home page  */}
            <Link to="/">
              <button className="next-buttons endgame-buttons">
                {translate("afterGame.backToMenu")}
              </button>
            </Link>

            {/* The button back to play the game */}
            <Link to="/play">
              <button className="next-buttons endgame-buttons">
                {translate("loseGame.playButton")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
