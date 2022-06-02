import { FC } from "react";
import { Position } from "../types";
import PositionableDiv from "./PositionableDiv";
import imageDoor from "../images/door.png";

// The value for the size of the door,
// so that we can always change it here any time
export const DOOR_SIZE = 128;

/**
 * File: ExitDoor.tsx
 *
 * This file contains the exit door to end the game.
 *
 * @param props The position of the door
 * @constructor The ExitDoor file
 */
const ExitDoor: FC<Position> = (props) => {

    // The position of the exit door
  const { x, y } = props;

  return (
      // Return the image of the exit door at the specified position
    <PositionableDiv x={x} y={y} width={DOOR_SIZE} height={DOOR_SIZE}>
      <img src={imageDoor} width={DOOR_SIZE} height={DOOR_SIZE} alt="" />
    </PositionableDiv>
  );
};
// Exporting the ExitDoor to be used in the playing field
export default ExitDoor;
