import { FC } from "react";
import {Position} from "../types";
import PositionableDiv from "./PositionableDiv";
import imageFlowers from "../images/flower-1.png";


/**
 * The background for our playing field. A blue sky, maybe some clouds (possibly animated) etc.
 */
const Flowers: FC<Position & { }> = (props) => {
    const { x, y } = props;

    return (
        <PositionableDiv x={x} y={y} width={32} height={32} isCenterPosition>
            <img src={imageFlowers} width={32} height={32} alt="" />
        </PositionableDiv>
    );
};
export default Flowers;
