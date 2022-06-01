import { FC } from "react";

/**
 * The background for our playing field. A blue sky, maybe some clouds (possibly animated) etc.
 */
const HelpButton: FC<{
    showTutorial: () => void,
}> = (props) => {
    const {showTutorial} = props

    return (
        <div style={{position:"fixed",
        top:0,
        left:0}}>
            <button className="help" onClick={showTutorial}>?</button>
        </div>
    );
};
export default HelpButton;
