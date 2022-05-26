import { FC } from "react";
import { Position } from "../types";
import PositionableDiv from "./PositionableDiv";
import imageDoor from "../images/door.png";

export const DOOR_SIZE = 128;

const ExitDoor: FC<Position> = (props) => {
  const { x, y } = props;

  return (
    <PositionableDiv x={x} y={y} width={DOOR_SIZE} height={DOOR_SIZE}>
      <img src={imageDoor} width={DOOR_SIZE} height={DOOR_SIZE} alt="" />
    </PositionableDiv>
  );
};
export default ExitDoor;
