import { FC } from "react";
import {Position} from "../types";
import PositionableDiv from "./PositionableDiv";

/**
 * The background for our playing field. A blue sky, maybe some clouds (possibly animated) etc.
 */
const Lives: FC<Position & { width: number; height: number; lives:number; }> = (props) => {
    const { x, y, width, height, lives } = props;

    return (
        <PositionableDiv
            x={x}
            y={y}
            width={width}
            height={height}
            style={{ backgroundColor: "transparent" }}
        >
            Lives: {lives}
        </PositionableDiv>
    );
};
export default Lives;
