import { FC } from "react";
import {Position} from "../types";
import PositionableDiv from "./PositionableDiv";
import imageFlowers from "../images/flower-1.png";


/**
 * File: Flowers.tsx
 *
 * This file contains the flowers in the game as a decoration to
 * the playing field
 *
 * @param props The position of the flowers
 * @constructor The Flowers file
 */
const Flowers: FC<Position & { }> = (props) => {
    // The position of the flowers
    const { x, y } = props;

    return (
        // Return the images of the flowers at the specified position
        <PositionableDiv x={x} y={y} width={32} height={32} isCenterPosition>
            <img src={imageFlowers} width={32} height={32} alt="" />
        </PositionableDiv>
    );
};
// Exporting the Flowers to be used in the playing field
export default Flowers;
