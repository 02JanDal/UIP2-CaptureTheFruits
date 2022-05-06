import { FC } from "react";
import imageBackground from "../images/background.png";

/**
 * The background for our playing field. A blue sky, maybe some clouds (possibly animated) etc.
 */
const Background: FC = () => {
  return (
    <img
        src={imageBackground}
        alt=""
        style={{
          height: "100%",
          width: "100%",
          overflow: "hidden",
          objectFit: "cover",
          objectPosition: "top",
        }}
    />
  );
};
export default Background;
