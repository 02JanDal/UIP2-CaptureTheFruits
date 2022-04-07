import { FC, useState } from "react";
import { Position } from "../types";
import Background from "./Background";
import Platform from "./Platform";
import Character from "./Character";
import Fruit from "./Fruit";

const PlayingField: FC = (props) => {
  const [playerPos, setPlayerPos] = useState<Position>({ x: 100, y: 100 });

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Background />
      <Platform x={0} y={0} width={1000} />
      <Platform x={500} y={50} width={1000} />
      {[...Array(20)].map((_, i) => (
        <Fruit
          key={i}
          x={200 + i * 50}
          y={170}
          points={i % 4 === 0 ? -10 : 5}
        />
      ))}
      <Character x={playerPos.x} y={playerPos.y} />
    </div>
  );
};
export default PlayingField;
