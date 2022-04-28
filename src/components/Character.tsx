import { FC, useState } from "react";
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

const Character: FC<
  Position & { walking: boolean; jumping: boolean; facing: "left" | "right" }
> = (props) => {
  const { x, y, walking, jumping, facing } = props;

  const [walkTime, setWalkTime] = useState(0);
  useAnimationFrame((delta) => setWalkTime(walkTime + delta));
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
    <PositionableDiv x={x} y={y} width={PLAYER_WIDTH} height={PLAYER_HEIGHT}>
      <img
        src={jumping ? imageJump : walking ? imageWalk : imageStand}
        alt=""
        width={30}
        height={60}
        style={facing === "left" ? { transform: "scaleX(-1)" } : {}}
      />
    </PositionableDiv>
  );
};
export default Character;
