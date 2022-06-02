import { FC } from "react";
import { Position } from "../types";
import PositionableDiv from "./PositionableDiv";
import imageGrass from "../images/tile-with-green-long.png";

// We don't want the top of the image to be the top of the platform, since it
// has some grass sticking up and it looks weird if the player walks on the grass
// that's sticking up rather than on the "base" of the grass.
// As such, we are setting the image offset.
const IMG_OFFSET = 7;

/**
 * File: Platform.tsx
 *
 * This file contains the platforms (the grass and the soil) of the game
 * where the player walks on and jumps to.
 *
 * @param props The position, the width, and the height of the platform
 * @constructor The Platform file
 */
const Platform: FC<Position & { width: number; height: number }> = (props) => {
  // The position, width and height of the platform
  const { x, y, width, height } = props;

  return (
      // Travers through the array of positions of the platform
      // and return the images of the platforms at the specified position
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
// Exporting the Platform to be displayed in the playing field
export default Platform;
