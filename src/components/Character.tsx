import { FC, useState, useEffect, useRef } from "react";
import { Position } from "../types";
import PositionableDiv from "./PositionableDiv";
import imageStand from "../images/char-stand.png";
import imageJump from "../images/char-jump.png";
import imageWalk1 from "../images/char-walk-1.png";
import imageWalk2 from "../images/char-walk-2.png";
import imageWalk3 from "../images/char-walk-3.png";
import imageWalk4 from "../images/char-walk-4.png";
import imageWalk5 from "../images/char-walk-5.png";
import imageWalk6 from "../images/char-walk-6.png";
import imageWalk7 from "../images/char-walk-7.png";
import imageWalk8 from "../images/char-walk-8.png";
import { useAnimationFrame } from "../hooks/useAnimationFrame";
import { PLAYER_HEIGHT, PLAYER_WIDTH } from "../hooks/usePhysicsController";
import { HOWLER_VOLUME } from "../settings";
import ReactHowler from "react-howler";

/**
 * File: Character.tsx
 *
 * This file contains the character of our game.
 * There are many character images in this file, depending on whether
 * the character is standing still, walking, or jumping.
 *
 * @param props The position of the character, the boolean whether or not the character
 * is walking or jumping, the boolean for the character facing left or right
 * @constructor The Character file
 */
const Character: FC<
  Position & { walking: boolean; jumping: boolean; facing: "left" | "right" }
> = (props) => {
  // Declaring the arguments (character position and whether or not the
  // character is walking or jumping, and the direction of the character
  const { x, y, walking, jumping, facing } = props;

  const jumpingSound = useRef(false);
  useEffect(() => {
    if (jumping) {
      jumpingSound.current = true;
    }
  }, [jumping]);

  // The set a timer for when the character walks
  const [walkTime, setWalkTime] = useState(0);
  useAnimationFrame((delta) => setWalkTime(walkTime + delta));

  // Change the characters' images while the character is walking
  const walkIndex = Math.round((walkTime / 125) % 7);
  const imageWalk = [
    imageWalk1,
    imageWalk2,
    imageWalk3,
    imageWalk4,
    imageWalk5,
    imageWalk6,
    imageWalk7,
    imageWalk8,
  ][walkIndex];

  return (
      // Return the image of the character and changing the images while the character
      // is walking or jumping
    <PositionableDiv x={x} y={y} width={PLAYER_WIDTH} height={PLAYER_HEIGHT}>
      <img
        src={jumping ? imageJump : walking ? imageWalk : imageStand}
        alt=""
        width={30}
        height={60}
        style={facing === "left" ? { transform: "scaleX(-1)" } : {}}
      />

      <ReactHowler
        src="/sounds/jump400.mp3"
        preload={true}
        html5={true}
        loop={false}
        onEnd={() => {
          jumpingSound.current = false;
        }}
        playing={jumpingSound.current}
        volume={HOWLER_VOLUME}
      />

      <ReactHowler
        src="/sounds/walk.wav"
        preload={true}
        html5={true}
        loop={true}
        playing={walking && !jumping}
        volume={HOWLER_VOLUME}
      />
    </PositionableDiv>
  );
};
// Exporting the Character to be used in the playing field
export default Character;
