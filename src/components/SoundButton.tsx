import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSound } from "../sound";
import { useTranslate } from "react-polyglot";

/**
 * File: SoundButton.tsx
 *
 * This file contains the button to turn on/off the
 * background music in the home page or playing field.
 *
 * @constructor The SoundButton file
 */
const SoundButton: FC = () => {
  const translate = useTranslate();
  const { muted, setMuted } = useSound();

  return (
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
export default SoundButton;
