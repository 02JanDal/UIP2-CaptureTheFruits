import { PlayingFieldDefinition } from "../playingFieldDefinition";
import { useEffect, useState } from "react";

/**
 * File: UseGameController.ts
 *
 * This file contains the React hook to reset the game
 * when the player has lost the lives.
 *
 * @param playingField The playing field of the user
 * @param setPlayerPos The player's position
 * @param onLost The function that will be executed when the user lost the game
 * (which is to navigate to the "LoseGamePage").
 */
export default function useGameController(
  playingField: PlayingFieldDefinition,
  setPlayerPos: (p: PlayingFieldDefinition["playerStart"]) => void,
  onLost: () => void
) {
  // Setting the points of the player to 0
  const [currentPoints, setPoints] = useState(0);

  // Setting the players' current lives
  const [currentLives, setLives] = useState(3);

  // When the current points is less than 0, then we
  // decrease the players' lives
  useEffect(() => {
    if (currentPoints < 0) {
      setLives(currentLives - 1);
      setPoints(0);
    }
  }, [currentLives, currentPoints]);
  // When the current lives is less than 0,
  // then we execute the onLost function, which
  // is to navigate to the "LoseGamePage"
  useEffect(() => {
    if (currentLives <= 0) {
      onLost();
    }
  }, [currentLives, onLost]);

  // Return the current points, current lives, the setPoints to set the players' points,
  // and the LooseLife function to decrease the player's lives by 1
  return {
    currentPoints,
    currentLives,
    setPoints,
    looseLife: () => setLives(currentLives - 1),
  };
}
