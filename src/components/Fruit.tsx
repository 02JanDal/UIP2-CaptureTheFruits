import { FC } from "react";
import { Position } from "../types";
import PositionableDiv from "./PositionableDiv";
import imageFruit1 from "../images/fruit-1.png";
import imageFruit2 from "../images/fruit-2.png";
import imageFruit3 from "../images/fruit-3.png";

// The value for the size of the fruits,
// so that we can always change it here
export const FRUIT_SIZE = 32;

/**
 * File: Fruits.tsx
 *
 * This file contains the fruits in the game where
 * the player can gain or lose points from 'eating' them
 *
 * @param props The position of the fruits and the points of each fruits (positive or negative)
 * @constructor The Fruits file
 */
const Fruit: FC<Position & { points: number }> = (props) => {
  // The position and the points of the fruits
  const { x, y, points } = props;

  // Assigning different points to different fruits.
  // If points is less than 0 (negative), then the image of the fruit should be eggplant.
  // If points is more than 10, then the image of the fruit should be banana.
  // If points is between 0 and 10, then the image of the fruit should be tomato.
  const imageFruit =
    points < 0 ? imageFruit3 : points >= 10 ? imageFruit2 : imageFruit1;

  return (
      // Return the images of the fruits at the specified position
    <PositionableDiv
      x={x}
      y={y}
      width={FRUIT_SIZE}
      height={FRUIT_SIZE}
      isCenterPosition
    >
      <img src={imageFruit} width={FRUIT_SIZE} height={FRUIT_SIZE} alt="" />
    </PositionableDiv>
  );
};
// Exporting the Fruits to be used in the playing field
export default Fruit;
