import { FC } from "react";
import { Position } from "../types";
import PositionableDiv from "./PositionableDiv";
import imageGrass from "../images/tile-with-green-long.png";

// we don't want the top of the image to be the top of the platform, since it
// has some grass sticking up and it looks weird if the player walks on the grass
// that's sticking up rather than on the "base" of the grass
const IMG_OFFSET = 7;

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
            height: height + IMG_OFFSET,
            overflow: "hidden",
            objectFit: "cover",
            objectPosition: "top",
            marginTop: -IMG_OFFSET,
          }}
        />
      ))}
    </PositionableDiv>
  );
};
export default Platform;
