import { FC } from "react";
import { Position } from "../types";
import PositionableDiv from "./PositionableDiv";

const Platform: FC<Position & { width: number; height: number }> = (props) => {
  const { x, y, width, height } = props;

  return (
    <PositionableDiv
      x={x}
      y={y}
      width={width}
      height={height}
      style={{ backgroundColor: "brown" }}
    >
      Platform
    </PositionableDiv>
  );
};
export default Platform;
