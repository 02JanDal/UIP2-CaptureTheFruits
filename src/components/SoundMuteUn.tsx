import { FC,  useEffect, useRef } from "react";
import muteImage from "../images/mute.png";
import unMuteImage from "../images/unmute.png";

const SoundMuteUn: FC<{ image: number }> = (props) => {
  const mute = useRef(true);
  useEffect(() => {
    Howler.mute(!mute.current);
  }, [mute]);

  return (
    <div>
      <img
        onClick={() => mute.current = !mute }
        src={mute ? unMuteImage : muteImage}
        width="40"
        height="40"
      />

    </div>
  );
};
export default SoundMuteUn;
