import { FC, useEffect, useState } from "react";
import Background from "./Background";
import Platform from "./Platform";
import Character from "./Character";
import Fruit from "./Fruit";
import { playingField } from "../playingFieldDefinition";
import usePhysicsController from "../hooks/usePhysicsController";

const PlayingField: FC = (props) => {
  const [touchedFruits, setTouchedFruits] = useState<number[]>([]);
  const [pf, setPF] = useState(playingField);
  const { setPlayerVerticalVelocity, playerPos, setPlayerPos } =
    usePhysicsController(
      playingField,
      (index, points) => {
        setPF({
          ...pf,
          fruits: pf.fruits.slice(index, index),
        });

        if (!touchedFruits.includes(index)) {
          setTouchedFruits([...touchedFruits, index]);
          console.log(`Touched fruit ${index} worth ${points} points`);
        }
      },
      () => console.log("fell off")
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
      {playingField.fruits
        .filter((_, index) => !touchedFruits.includes(index))
        .map((f, i) => (
          <Fruit key={i} x={f.x} y={f.y} points={f.points} />
        ))}
      <Character x={playerPos.x} y={playerPos.y} />
    </div>
  );
};
export default PlayingField;
