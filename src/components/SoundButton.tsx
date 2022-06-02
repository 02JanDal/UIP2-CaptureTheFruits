import {FC, useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**
 * File: SoundButton.tsx
 *
 * This file contains the button to turn on/off the
 * background music in the home page or playing field.
 *
 * Source for this code: https://stackoverflow.com/questions/47686345/playing-sound-in-react-js
 *
 * @param props The URL of the sound
 * @constructor The SoundButton file
 */
const SoundButton: FC<{
    source: string,
}> = (props) => {
    // The URL string of the background music
    const {source} = props

    // The audio of the background music
    const [audio] = useState(new Audio(source));

    // Setting whether or not the audio is played (true) or not (false)
    // when a page is opened
    const [playing, setPlaying] = useState(true);

    // Toggle function (or button) to set the audio to "playing" when clicked
    // when the audio is paused, and set the audio to "pause"
    // when clicked when the audio is playing
    const toggle = () => setPlaying(!playing);

    // Use Effect side function to
    useEffect(() => {
            playing ? audio.play() : audio.pause();
        },
        [playing]
    );

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    return (
        <div>
            <button className="next-buttons home-buttons" onClick={toggle}>
                <FontAwesomeIcon icon = {playing ? "volume-up" :"volume-mute"}/>
                {playing ? "Pause Music" : "Play Music"}</button>
        </div>
    );
};
export default SoundButton;