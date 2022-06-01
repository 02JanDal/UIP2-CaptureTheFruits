import { FC } from "react";

/**
 * The background for our playing field. A blue sky, maybe some clouds (possibly animated) etc.
 */
const HelpButton: FC<{
    showTutorial: () => void,
}> = (props) => {
    const {showTutorial} = props

    return (
        <button className="help" onClick={showTutorial}>?</button>
    );
};
export default HelpButton;
