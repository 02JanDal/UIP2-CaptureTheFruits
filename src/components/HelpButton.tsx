import { FC } from "react";

/**
 * File: HelpButton.tsx
 *
 * This file contains the help button that is specified at
 * the playing game. The user can always click this button
 * to see the tutorial of the game again, in case they forgot.
 *
 * @param props The function showTutorial to start the tutorial
 * @constructor The HelpButton file
 */
const HelpButton: FC<{
    showTutorial: () => void,
}> = (props) => {
    // The function showTutorial to start the tutorial step from beginning (step 1)
    // as specified in the playing Field
    const {showTutorial} = props

    return (
        // The image of the help button in the position specified
        <div style={{position:"fixed",
        top:0,
        left:0}}>
            <button className="help" onClick={showTutorial}>?</button>
        </div>
    );
};
// Exporting the HelpButton to be used in the playing field
export default HelpButton;
