import { FC, useState } from "react";
import Background from "./Background";
import Platform from "./Platform";
import Character from "./Character";
import Fruit from "./Fruit";
import { playingField } from "../playingFieldDefinition";
import usePhysicsController, {PLAYER_HEIGHT} from "../hooks/usePhysicsController";
import Points from "./Points";
import Lives from "./Lives";
import useFruitController from "../hooks/useFruitController";

const PlayingField: FC = (props) => {
  const [currentPoints, setPoints] = useState(0);
  const [currentLives, setLives] = useState(3);

  const { setPlayerVerticalVelocity, playerPos, setPlayerPos, onGround } =
    usePhysicsController(playingField, () => {
        // Bug: this doesnt work somehow
        setPlayerPos(playingField.playerStart);
        console.log("fell off");
    });

    const { fruits, setTouchedFruits } = useFruitController(
    playingField.fruits,
    playerPos,
    (points) => {
      setPoints(currentPoints + points);
      console.log(currentPoints);
      if (currentPoints + points < 0 && points === -5) {
        setLives(currentLives - 1);
      }
      // Will tidy this up in a new function
      if (currentLives - 1 <= 0){
          setPoints(0);
          setLives(3);
          setPlayerPos(playingField.playerStart);
          setTouchedFruits([]);
      }
      console.log(`Touched fruit worth ${points} points`);
    }
  );

    // Player falling gets reset, works here falling works here!!
    let pos = { ...playerPos };
    if (pos.y + PLAYER_HEIGHT < 0) {
        setPlayerPos(playingField.playerStart);
        setLives(currentLives - 1);
        // should be in a new function!
        if (currentLives - 1 <= 0){
            setPoints(0);
            setLives(3);
            setPlayerPos(playingField.playerStart);
            setTouchedFruits([]);
        }
    }

    return (
    <div
      style={{
        position: "relative",
        width: `${playingField.width}px`,
        height: "100%",
      }}
      // some placeholder interaction just to test the physics
      onDoubleClick={() => setPlayerVerticalVelocity(300)}
      onClick={(e) =>
        setPlayerPos({
          x: e.clientX,
          y: (e.target as HTMLDivElement).clientHeight - e.clientY,
        })
      }
    >
      <Background />
      {playingField.platforms.map((p, i) => (
        <Platform key={i} x={p.x} y={p.y} width={p.width} height={p.height} />
      ))}
      {fruits.map((f, i) => (
        <Fruit key={i} x={f.x} y={f.y} points={f.points} />
      ))}
      <Lives x={playingField.lives.x} y={playingField.lives.y} width={playingField.lives.width} height={playingField.lives.height} lives={currentLives} />
      <Points x={playingField.points.x} y={playingField.points.y} width={playingField.points.width} height={playingField.points.height} points={currentPoints} />
      <Character
        x={playerPos.x}
        y={playerPos.y}
        jumping={!onGround}
        walking={false}
      />
    </div>
  );
};
export default PlayingField;
