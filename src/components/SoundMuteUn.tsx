import { FC,useState, useEffect } from "react";
import ReactHowler from 'react-howler'
import muteImage from '../images/mute.png';
import unMuteImage from '../images/unmute.png';


const SoundMuteUn: FC<{ image: number }> = (props) => {

    const [mute, setMute] = useState(true);
    useEffect(() => {
        Howler.mute(!mute);
    }, [mute]);

    return(
      <div>
          <img
            onClick={() => setMute(!mute)}
            src={ mute ? unMuteImage : muteImage }
            width="40" height="40"
            />
      </div>
    );
};
export default SoundMuteUn;
