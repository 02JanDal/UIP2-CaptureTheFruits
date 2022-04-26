import { FC } from "react";
import { Position } from "../types";
import PositionableDiv from "./PositionableDiv";
import imageGrass from "../images/tile-with-green-long.png";

const Platform: FC<Position & { width: number; height: number }> = (props) => {
  const { x, y, width, height } = props;

  return (
    <PositionableDiv
      x={x}
      y={y}
      width={width}
      height={height}
      style={{ display: "flex" }}
    >
      {[...new Array(Math.ceil(width / 128))].map((_, i) => (
        <img
          key={i}
          src={imageGrass}
          alt=""
          width={128}
          height={128}
          style={{
            height: height,
            overflow: "hidden",
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
      ))}
    </PositionableDiv>
  );
};
export default Platform;
