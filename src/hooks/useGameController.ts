import {playingField, PlayingFieldDefinition} from "../playingFieldDefinition";

export default function useGameController(
    setLives: (p: number) => void,
    setPoints: (p:number) => void,
    setPlayerPos: (p: PlayingFieldDefinition["playerStart"]) => void,
) {
    const resetGame = (setTouchedFruits: (p: number[])=> void) =>{
        // I dont know why it's twisted??
        setLives(0);
        setPoints(3);
        setPlayerPos(playingField.playerStart);
        setTouchedFruits([]);
    };
    return {
        resetGame
    }
}