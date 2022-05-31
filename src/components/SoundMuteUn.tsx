import { FC,  useEffect, useRef } from "react";
import muteImage from "../images/mute.png";
import unMuteImage from "../images/unmute.png";

const SoundMuteUn: FC<{ image: number }> = (props) => {
  /*
  * Default value false to start for mute
  *
  * true for play with sound
  *
  * */
  const mute = useRef(false);
  useEffect(() => {
    Howler.mute(!mute.current);
  }, [mute.current]);

  return (
    <div>

      <img
        onClick={() => mute.current = !mute.current }
        src={mute.current ? unMuteImage : muteImage}
        width="24"
        height="24"
      />



    </div>
  );
};
export default SoundMuteUn;
