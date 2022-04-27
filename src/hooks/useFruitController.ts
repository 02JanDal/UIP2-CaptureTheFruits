import { Position } from "../types";
import { PlayingFieldDefinition } from "../playingFieldDefinition";
import { useEffect, useState } from "react";
import {
  intersects,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
} from "./usePhysicsController";
import lives from "../components/Lives";

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
          { ...fruit, width: 0, height: 0 },
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
