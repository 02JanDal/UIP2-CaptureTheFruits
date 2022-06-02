import { Position } from "../types";
import { PlayingFieldDefinition } from "../playingFieldDefinition";
import { useEffect, useState } from "react";
import {
  intersects,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
} from "./usePhysicsController";
import { FRUIT_SIZE } from "../components/Fruit";

/**
 * File: useFruitController.ts
 *
 * This file contains the React hook to control
 * whether the fruits are being touched by
 * the character so that we can remove them
 * or put them back up on the screen when
 * the character dies or completes the game.
 *
 * @param fruits The array of positions of the fruits
 * @param player The player's position
 * @param onFruitTouched The function that returns the total points of fruits that had been touched
 * by the player
 */
export default function useFruitController(
  fruits: PlayingFieldDefinition["fruits"],
  player: Position,
  onFruitTouched: (points: number) => void
) {
  // Setting the array of fruits that had been touched by the player
  const [touchedFruits, setTouchedFruits] = useState<number[]>([]);

  // The game logic that if the player's position has intersected with the fruits' position
  // then the index of that fruit will be added to the array of fruits that had been "touched"
  // by the player. Then, the points of these fruits are calculated for the player's score
  useEffect(() => {
    fruits.forEach((fruit, index) => {
      if (
        !touchedFruits.includes(index) &&
        intersects(
          { ...fruit, width: FRUIT_SIZE, height: FRUIT_SIZE },
          { ...player, width: PLAYER_WIDTH, height: PLAYER_HEIGHT }
        )
      ) {
        setTouchedFruits([...touchedFruits, index]);
        onFruitTouched(fruit.points);
      }
    });
  }, [fruits, onFruitTouched, player, touchedFruits]);

  // Return the list of fruits that have not been touched by the player
  // And the array of fruits that have been touched by the player
  return {
    fruits: fruits.filter((_, index) => !touchedFruits.includes(index)),
    setTouchedFruits,
  };
}
