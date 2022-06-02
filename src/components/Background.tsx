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
    />
  );
};
// Exporting the background to be used in the playing field
export default Background;
