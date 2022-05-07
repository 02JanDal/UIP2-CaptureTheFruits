import { FC } from "react";
import { Position } from "../types";
import PositionableDiv from "./PositionableDiv";
import imageFruit1 from "../images/fruit-1.png";
import imageFruit2 from "../images/fruit-2.png";
import imageFruit3 from "../images/fruit-3.png";

export const FRUIT_SIZE = 32;

const Fruit: FC<Position & { points: number }> = (props) => {
  const { x, y, points } = props;

  const imageFruit =
    points < 0 ? imageFruit3 : points >= 10 ? imageFruit2 : imageFruit1;

  return (
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
export default Fruit;
