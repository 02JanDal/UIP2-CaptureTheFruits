import { FC, useEffect, useState } from "react";
import muteImage from "../images/mute.png";
import unMuteImage from "../images/unmute.png";
import { useSound } from "../sound";

const SoundMuteUn: FC = () => {
  const { muted, setMuted } = useSound();

  return (
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
export default SoundMuteUn;
