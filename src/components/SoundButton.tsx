import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSound } from "../sound";
import { useTranslate } from "react-polyglot";

/**
 * File: SoundButton.tsx
 *
 * This file contains the button to turn on/off the
 * background music in the home page
 *
 * @constructor The SoundButton file
 */
const SoundButton: FC = () => {

    // Using the useTranslate() constructor to access the strings that
    // are written in the dictionary
  const translate = useTranslate();

  // To initialize the sound in the background music
    // and set whether the sound is muted or not
  const { muted, setMuted } = useSound();

  return (
      // Show the sound button to toggle on and off the background music
    <div>
      <button
        className="next-buttons home-buttons"
        onClick={() => setMuted(!muted)}
      >
        <FontAwesomeIcon icon={muted ? "volume-down" : "volume-up"} />
        {muted ? translate("menu.unmute") : translate("menu.mute")}
      </button>
    </div>
  );
};
// Exporting the SoundButton to be displayed in the playing field
export default SoundButton;
