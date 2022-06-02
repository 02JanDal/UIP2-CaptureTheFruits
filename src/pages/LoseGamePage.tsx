import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useTranslate } from "react-polyglot";
import ReactHowler from "react-howler";
import { HOWLER_VOLUME } from "../settings";

export const LoseGamePage: FC = () => {
  const translate = useTranslate();

  return (
    <div className="home-page-picture">
      <ReactHowler
        src="/sounds/gameOver.wav"
        preload={true}
        html5={true}
        loop={false}
        playing={true}
        volume={HOWLER_VOLUME}
      />
      <div className="home-page-layover">
        <div className="home-page-container end-page-container">
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
            <Link to="/">
              <button className="next-buttons endgame-buttons">
                {translate("afterGame.backToMenu")}
              </button>
            </Link>
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
