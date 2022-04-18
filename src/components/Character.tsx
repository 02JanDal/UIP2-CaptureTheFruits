import { FC } from "react";
import { Position } from "../types";
import PositionableDiv from "./PositionableDiv";

const Character: FC<Position> = (props) => {
  const { x, y } = props;
  const PLAYER_WIDTH = 30;
  const PLAYER_HEIGHT = 60;

  return (
    <PositionableDiv
      x={x}
      y={y}
      width={PLAYER_WIDTH}
      height={PLAYER_HEIGHT}
      style={{ backgroundColor: "orange" }}
    >
      Character
    </PositionableDiv>
  );
};
export default Character;
