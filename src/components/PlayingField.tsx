import { FC, useState } from "react";
import Background from "./Background";
import Platform from "./Platform";
import Character from "./Character";
import Fruit from "./Fruit";
import { playingField } from "../playingFieldDefinition";
import usePhysicsController from "../hooks/usePhysicsController";
import Points from "./Points";
import Lives from "./Lives";
import useFruitController from "../hooks/useFruitController";

const PlayingField: FC = (props) => {
  const [currentPoints, setPoints] = useState(0);
  const [currentLives, setLives] = useState(3);

  const { setPlayerVerticalVelocity, playerPos, setPlayerPos, onGround } =
    usePhysicsController(playingField, () => console.log("fell off"));

  const { fruits } = useFruitController(
    playingField.fruits,
    playerPos,
    (points) => {
      setPoints(currentPoints + points);
      console.log(currentPoints);
      if (currentPoints + points < 0 && points === -5) {
        setLives(currentLives - 1);
      }
      console.log(`Touched fruit worth ${points} points`);
    }
  );

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
      <Lives x={1250} y={580} width={50} height={100} lives={currentLives} />
      <Points x={1180} y={580} width={50} height={100} points={currentPoints} />
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
