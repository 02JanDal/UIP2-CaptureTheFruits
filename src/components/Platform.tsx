import { FC } from "react";
import { Position } from "../types";
import PositionableDiv from "./PositionableDiv";

const Platform: FC<Position & { width: number }> = (props) => {
  const { x, y, width } = props;

  return (
    <PositionableDiv
      x={x}
      y={y}
      width={width}
      height={100}
      style={{ backgroundColor: "brown" }}
    >
      Platform
    </PositionableDiv>
  );
};
export default Platform;
