import { FC } from "react";
import {Position} from "../types";
import PositionableDiv from "./PositionableDiv";

/**
 * The background for our playing field. A blue sky, maybe some clouds (possibly animated) etc.
 */
const Points: FC<Position & { width: number; height: number; points:number; }> = (props) => {
    const { x, y, width, height, points } = props;

    return (
        <PositionableDiv
            x={x}
            y={y}
            width={width}
            height={height}
            style={{ backgroundColor: "transparent" }}
        >
            Points: {points}
        </PositionableDiv>
    );
};
export default Points;
