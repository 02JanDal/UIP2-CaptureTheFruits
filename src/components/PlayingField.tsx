import { FC } from "react";
import Background from "./Background";
import Platform from "./Platform";
import Character from "./Character";
import Fruit from "./Fruit";
import { playingField } from "../playingFieldDefinition";

const PlayingField: FC = (props) => {
  const [playerPos, setPlayerPos] = useState<Position>({ x: 100, y: 100 });

  return (
    <div
      style={{
        position: "relative",
        width: `${playingField.width}px`,
        height: "100%",
      }}
    >
      <Background />
      {playingField.platforms.map((p, i) => (
        <Platform key={i} x={p.x} y={p.y} width={p.width} height={p.height} />
      ))}
      {playingField.fruits.map((f, i) => (
        <Fruit key={i} x={f.x} y={f.y} points={f.points} />
      ))}
      <Character x={playerPos.x} y={playerPos.y} />
    </div>
  );
};
export default PlayingField;
