import { FC } from "react";
import { Position } from "../types";
import PositionableDiv from "./PositionableDiv";
import imageTree1 from "../images/moving-tree-1.gif";
import imageTree2 from "../images/moving-tree-2.gif";

/**
 * File: Tree.tsx
 *
 * This file contains the animation of the tree
 * as a decoration of our game in the playing field.
 *
 * @param props The image number of the tree (whether it is image one or two)
 * @constructor The Tree file
 */
const Tree: FC<Position & { image: number }> = (props) => {
  // The position of the tree and the image number of the tree
  const { x, y, image } = props;

  // Allocating the tree image.
  // If the tree number is number 0, then it will return the first image of the tree
  // If the tree number is number 1, then it will return the second image of the tree
  const imageTree = image === 0 ? imageTree1 : imageTree2;

  return (
      // Return the image of the tree in its specified position
    <PositionableDiv x={x} y={y} width={200} height={200} isCenterPosition>
      <img src={imageTree} width={200} height={200} alt="" />
    </PositionableDiv>
  );
};
// Exporting the animation of the tree to be displayed in the playing field
export default Tree;
