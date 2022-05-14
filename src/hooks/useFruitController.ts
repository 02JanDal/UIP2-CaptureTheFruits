import { Position } from "../types";
import { PlayingFieldDefinition } from "../playingFieldDefinition";
import { useEffect, useState } from "react";
import {
  intersects,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
} from "./usePhysicsController";
import { FRUIT_SIZE } from "../components/Fruit";

export default function useFruitController(
  fruits: PlayingFieldDefinition["fruits"],
  player: Position,
  onFruitTouched: (points: number) => void
) {
  const [touchedFruits, setTouchedFruits] = useState<number[]>([]);



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

  return {
    fruits: fruits.filter((_, index) => !touchedFruits.includes(index)),
    setTouchedFruits,
  };
}
