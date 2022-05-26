import React, { FC } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import PlayingField from "../components/PlayingField";
import playingFields from "../data/playingFields";
import { useTranslate } from "react-polyglot";

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

  const { state } = useLocation();
  if (!state || !isGameState(state)) {
    console.log(state);
    navigate("/");
    return null;
  }

  const { id, lives, points } = state;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        top: "40%",
        position: "relative",
      }}
    >
      <div
        style={{
          fontSize: 50,
          height: "100%",
          width: "100%",
          textAlign: "center",
        }}
      >
        {translate("afterGame.youFinished", { lives, points })}
      </div>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <Link to="/">
          <button>{translate("afterGame.backToMenu")}</button>
        </Link>
      </div>
    </div>
  );
};
