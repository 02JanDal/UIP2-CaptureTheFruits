import { PlayingFieldDefinition } from "../playingFieldDefinition";

export default function useGameController(
  playingField: PlayingFieldDefinition,
  setLives: (p: number) => void,
  setPoints: (p: number) => void,
  setPlayerPos: (p: PlayingFieldDefinition["playerStart"]) => void
) {
  const resetGame = (setTouchedFruits: (p: number[]) => void) => {
    // I dont know why it's twisted??
    setLives(3);
    setPoints(0);
    setPlayerPos(playingField.playerStart);
    setTouchedFruits([]);
  };
  return {
    resetGame,
  };
}
