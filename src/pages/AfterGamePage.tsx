import React, { FC, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import PlayingField from "../components/PlayingField";
import playingFields from "../data/playingFields";
import { useTranslate } from "react-polyglot";
import { useAppendLeaderboard } from "../leaderboard";

// The interface of the current game state
interface GameState {
  id: number;
  lives: number;
  points: number;
}

/**
 * The isGameState function checks the current game statistics and returns
 * the id, lives, and points of the completed game by the player
 * @param obj Object
 */
function isGameState(obj: any): obj is GameState {
  return "id" in obj && "lives" in obj && "points" in obj;
}

/**
 * File: AfterGamePage.tsx
 *
 * This file contains the after game page that will
 * be shown when the player completes the game.
 *
 * @constructor The AfterGamePage file
 */
export const AfterGamePage: FC = () => {

    // Initialize the useNavigate() function to navigate to another page
  const navigate = useNavigate();

  // Initialize the useTranslate() function to access the strings/text in the dictionary
  const translate = useTranslate();

  // Initialize useAppendLeaderboard hook to append the leaderboard in case
    // the player adds their name to the leaderboard
  const appendLeaderboard = useAppendLeaderboard();

  // Set the name in the leaderboard
  const [name, setName] = useState("");

  // Prevent adding our score to the leaderboard  more than once
  const [addedToLeaderboard, setAddedToLeaderboard] = useState(false);

  // Initialize the useLocation() to know the current stats of the game
  const { state } = useLocation();
  // If there is no stats, then we return to the home page.
  if (!state || !isGameState(state)) {
    navigate("/");
    return null;
  }

  // The id, lives, and points of the player
  const { id, lives, points } = state;

  return (
      // Return the end game page when the user completes the game
      <div className="home-page-picture">
          <div className="home-page-layover">
              <div className="home-page-container end-page-container">
                  <div style={{fontFamily:"sans-serif", marginBottom: 20}}>
                      {translate("afterGame.youFinished")}
                  </div>

                  {/*Showing the lives and points */}
                  <div style={{fontSize: 30, fontFamily: 'Storytelling'}}>
                      {translate("afterGame.statistics", { lives, points })}
                  </div>

                  {/*Button to go back to main page after user completes the game*/}
                  <div
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <Link to="/">
                      <button className="next-buttons endgame-buttons">{translate("afterGame.backToMenu")}</button>
                    </Link>
                  </div>

                  {/*Button to input their name to the leaderboard*/}
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
