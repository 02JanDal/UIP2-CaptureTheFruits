import { FC } from "react";
import { Position } from "../types";
import PositionableDiv from "./PositionableDiv";
import imageTree1 from "../images/moving-tree-1.gif";
import imageTree2 from "../images/moving-tree-2.gif";

/**
 * The background for our playing field. A blue sky, maybe some clouds (possibly animated) etc.
 */
const Tree: FC<Position & { image: number }> = (props) => {
  const { x, y, image } = props;

  const imageTree = image === 0 ? imageTree1 : imageTree2;

  return (
    <PositionableDiv x={x} y={y} width={200} height={200} isCenterPosition>
      <img src={imageTree} width={200} height={200} alt="" />
    </PositionableDiv>
  );
};
export default Tree;
