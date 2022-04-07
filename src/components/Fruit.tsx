import { FC } from "react";
import { Position } from "../types";
import PositionableDiv from "./PositionableDiv";

const Fruit: FC<Position & { points: number }> = (props) => {
  const { x, y, points } = props;

  const color = points > 0 ? "green" : "red";
  return (
    <PositionableDiv
      x={x}
      y={y}
      width={10}
      height={10}
      style={{ backgroundColor: color, borderRadius: 5 }}
    >
      Fruit
    </PositionableDiv>
  );
};
export default Fruit;
