import { FC } from "react";
import imageBackground from "../images/background.png";
import PlayingField from "./PlayingField";
import ReactHowler from "react-howler";
import { HOWLER_VOLUME } from "../settings";

/**
 * The background for our playing field. A blue sky, maybe some clouds (possibly animated) etc.
 */
const Background: FC = () => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        overflow: "hidden",
        objectFit: "cover",
        objectPosition: "top",
        backgroundImage: `url(${imageBackground})`,
        backgroundRepeat: "repeat",
      }}
    >


      <ReactHowler
        src="/sounds/background.mp3"
        preload={true}
        loop={true}
        html5={true}
        playing={true}
        volume={0.07}
      />
    </div>
    // <img
    //     src={imageBackground}
    //     alt=""
    //     style={{
    //       height: "100%",
    //       width: "100%",
    //       overflow: "hidden",
    //       objectFit: "cover",
    //       objectPosition: "top",
    //         backgroundImage: imageBackground,
    //         backgroundRepeat: "repeat",
    //     }}
    // />
  );
};
export default Background;
