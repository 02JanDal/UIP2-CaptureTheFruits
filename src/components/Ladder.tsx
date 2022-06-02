import { FC } from "react";
import {Position} from "../types";
import PositionableDiv from "./PositionableDiv";
import imageLadder from "../images/ladder.png";


/**
 * File: Ladder.tsx
 *
 * This file contains the ladder in the game as a
 * decoration in the playing field.
 *
 * @param props the position, the width, and the height of the ladder
 * @constructor
 */
const Ladder: FC<Position & { width: number; height: number; }> = (props) => {
    // The position, the width, and the height of the ladder
    const { x, y, width, height } = props;

    return (
        // Return the images of the ladders at the specified position
        <PositionableDiv x={x} y={y} width={width} height={height} isCenterPosition>
            <img src={imageLadder} width={width} height={height} alt="" />
        </PositionableDiv>
    );
};
// Exporting the ladder to be used in the playing field
export default Ladder;
