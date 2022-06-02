import { FC } from "react";
import imageBackground from "../images/background.png";
import ReactHowler from "react-howler";

/**
 * File: Background.tsx
 *
 * This file contains the  background for our playing field.
 *
 * @constructor The Background file
 */
const Background: FC = () => {
  return (
    // A div tag that returns the image of the background and covers the full screen
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
  );
};
// Exporting the background to be used in the playing field
export default Background;
