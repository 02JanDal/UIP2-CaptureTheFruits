import React, { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlayingField from "../components/PlayingField";
import playingFields from "../data/playingFields";

/**
 * File: PlayPage.tsx
 *
 * This file returns the playing field that will be played
 * by the user.
 *
 * @constructor The PlayPage page.
 */
export const PlayPage: FC = () => {

  // Initializing the useNavigate() function to navigate to another page
  const navigate = useNavigate();

  // The ID of the playing field number that will be played by the user
  const { id } = useParams();
  if (!id) {
    return null;
  }

  // When the user finished the game, it will be routed to the
  // after game page
  const onFinished = (lives: number, points: number) => {
    navigate("/after-game", { state: { id: parseInt(id), lives, points } });
  };

  // Display the playing field depending on the ID
  return (
    <PlayingField field={playingFields[parseInt(id)]} onFinished={onFinished} />
  );
};
