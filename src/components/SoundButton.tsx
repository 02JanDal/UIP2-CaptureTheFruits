/**
 * Source inspiration: https://stackoverflow.com/questions/47686345/playing-sound-in-react-js
 */
import {FC, useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**
 * The background for our playing field. A blue sky, maybe some clouds (possibly animated) etc.
 */
const SoundButton: FC<{
    source: string,
}> = (props) => {
    const {source} = props
    const [audio] = useState(new Audio(source));
    const [playing, setPlaying] = useState(true);

    const toggle = () => setPlaying(!playing);

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