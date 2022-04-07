import { FC } from "react";
import { Position } from "../types";
import PositionableDiv from "./PositionableDiv";

const Character: FC<Position> = (props) => {
  const { x, y } = props;

  return (
    <PositionableDiv
      x={x}
      y={y}
      width={30}
      height={60}
      style={{ backgroundColor: "orange" }}
    >
      Character
    </PositionableDiv>
  );
};
export default Character;
