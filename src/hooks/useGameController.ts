import { PlayingFieldDefinition } from "../playingFieldDefinition";
import { useEffect, useState } from "react";

export default function useGameController(
  playingField: PlayingFieldDefinition,
  setPlayerPos: (p: PlayingFieldDefinition["playerStart"]) => void,
  onLost: () => void
) {
  const [currentPoints, setPoints] = useState(0);
  const [currentLives, setLives] = useState(3);

  useEffect(() => {
    if (currentPoints < 0) {
      setLives(currentLives - 1);
      setPoints(0);
    }
  }, [currentLives, currentPoints]);
  useEffect(() => {
    if (currentLives <= 0) {
      onLost();
    }
  }, [currentLives, onLost]);

  return {
    currentPoints,
    currentLives,
    setPoints,
    looseLife: () => setLives(currentLives - 1),
  };
}
