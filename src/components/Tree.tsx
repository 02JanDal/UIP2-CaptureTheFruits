import { FC } from "react";
import {Position} from "../types";
import PositionableDiv from "./PositionableDiv";
import imageTree from "../images/tree-2.png";


/**
 * The background for our playing field. A blue sky, maybe some clouds (possibly animated) etc.
 */
//TODO: Not animated yet.
const Tree: FC<Position & { }> = (props) => {
    const { x, y } = props;

    return (
        <PositionableDiv x={x} y={y} width={200} height={200} isCenterPosition>
            <img src={imageTree} width={200} height={200} alt="" />
        </PositionableDiv>
    );
};
export default Tree;
