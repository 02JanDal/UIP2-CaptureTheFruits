import { FC } from "react";
import {Link} from "react-router-dom";

/**
 * The background for our playing field. A blue sky, maybe some clouds (possibly animated) etc.
 */
const EndButton: FC= () => {
    return (
        <div style={{position:"fixed",
            top:30,
            left:80}}>
            <Link to="/" className="exit-button">Exit Game</Link>
        </div>
    );
};
export default EndButton;
