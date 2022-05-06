import { FC } from "react";
import {Position} from "../types";
import PositionableDiv from "./PositionableDiv";
import imageLadder from "../images/ladder.png";


/**
 * The background for our playing field. A blue sky, maybe some clouds (possibly animated) etc.
 */
const Ladder: FC<Position & { width: number; height: number; }> = (props) => {
    const { x, y, width, height } = props;

    return (
        <PositionableDiv x={x} y={y} width={width} height={height} isCenterPosition>
            <img src={imageLadder} width={width} height={height} alt="" />
        </PositionableDiv>
    );
};
export default Ladder;
