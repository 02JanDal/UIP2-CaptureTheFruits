import React, { FC, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import PlayingField from "../components/PlayingField";
import playingFields from "../data/playingFields";
import { useTranslate } from "react-polyglot";
import { useAppendLeaderboard } from "../leaderboard";

interface GameState {
  id: number;
  lives: number;
  points: number;
}

function isGameState(obj: any): obj is GameState {
  return "id" in obj && "lives" in obj && "points" in obj;
}

export const AfterGamePage: FC = () => {
  const navigate = useNavigate();
  const translate = useTranslate();
  const appendLeaderboard = useAppendLeaderboard();
  const [name, setName] = useState("");
  // to prevent adding ourselves more than once
  const [addedToLeaderboard, setAddedToLeaderboard] = useState(false);

  const { state } = useLocation();
  if (!state || !isGameState(state)) {
    navigate("/");
    return null;
  }

  const { id, lives, points } = state;

  return (
      <div className="home-page-picture">
          <div className="home-page-layover">
              <div className="home-page-container end-page-container">
                  <div style={{fontFamily:"sans-serif", marginBottom: 20}}>
                      {translate("afterGame.youFinished")}
                  </div>
                  <div style={{fontSize: 30, fontFamily: 'Storytelling'}}>
                      {translate("afterGame.statistics", { lives, points })}
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <Link to="/">
                      <button className="next-buttons endgame-buttons">{translate("afterGame.backToMenu")}</button>
                    </Link>
                  </div>
                  <div style={{
                      fontFamily: "sans-serif"
                  }}>
                    <p>{translate("afterGame.enterNameForLeaderboard")}</p>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={addedToLeaderboard}
                      className="leaderboard-input"
                    />
                    <button className="next-buttons save-button"
                      onClick={() => {
                        appendLeaderboard({
                          name,
                          lives,
                          points,
                          field: id,
                          date: new Date(),
                        });
                        setAddedToLeaderboard(true);
                      }}
                      disabled={addedToLeaderboard}
                    >
                      {translate("afterGame.save")}
                    </button>
                  </div>
              </div>
          </div>
      </div>
  );
};
