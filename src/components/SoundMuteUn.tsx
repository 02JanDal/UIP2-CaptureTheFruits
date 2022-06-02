import { FC, useEffect, useState } from "react";
import muteImage from "../images/mute.png";
import unMuteImage from "../images/unmute.png";
import { useSound } from "../sound";

/**
 * File: SoundMuteUn.tsx
 *
 * This file contains the button to turn on/off
 * the background music in the playing field.
 *
 * @constructor The SoundMuteUn file
 */
const SoundMuteUn: FC = () => {

    // To initialize the sound in the background music and
    // set whether the sound is muted or not
  const { muted, setMuted } = useSound();

  return (
      // Return the sound button toggle in the playing field
    <div>
      <img
        onClick={() => setMuted(!muted)}
        src={muted ? muteImage : unMuteImage}
        width="24"
        height="24"
      />
    </div>
  );
};
// Exporting the sound mute button to be displayed in the playing field
export default SoundMuteUn;
