import { FC } from "react";
import {Link} from "react-router-dom";

/**
 * File: EndButton.tsx
 *
 * This file contains the button to "Exit" the game while in the playing field.
 * The end button is there as the "emergency exit" in case
 * the user wants to stop playing while they're in the middle of the game.
 *
 * @constructor The EndButton file
 */
const EndButton: FC= () => {
    return (
        // Returning the exit button that is positioned at the
        // top left of the playing field
        <div style={{position:"fixed",
            top:30,
            left:80}}>
            <Link to="/" className="exit-button">Exit Game</Link>
        </div>
    );
};
// Exporting the EndButton to be used in the playing field
export default EndButton;
