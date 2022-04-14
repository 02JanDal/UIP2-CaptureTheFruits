import { PlayingFieldDefinition } from "../playingFieldDefinition";
import { Position } from "../types";
import { useRef, useState } from "react";
import { useAnimationFrame } from "./useAnimationFrame";

const PLAYER_WIDTH = 20;
const PLAYER_HEIGHT = 50;
const GRAVITY_ACCELERATION = 200;

function intersects(
  a: { x: number; y: number; width: number; height: number },
  b: { x: number; y: number; width: number; height: number }
) {
  const a_ = {
    left: a.x,
    right: a.x + a.width,
    bottom: a.y,
    top: a.y + a.height,
  };
  const b_ = {
    left: b.x,
    right: b.x + b.width,
    bottom: b.y,
    top: b.y + b.height,
  };
  return (
    a_.left <= b_.right &&
    b_.left <= a_.right &&
    a_.bottom <= b_.top &&
    b_.bottom <= a_.top
  );
}

export default function usePhysicsController(
  playingField: PlayingFieldDefinition,
  onTouchesFruit: (index: number, points: number) => void,
  onFellOff: () => void
) {
  const [playerPos, setPlayerPos] = useState<Position>(
    playingField.playerStart
  );
  const playerVerticalVelocity = useRef(0);

  useAnimationFrame((delta) => {
    let pos = { ...playerPos };

    // update player y position based on velocity
    pos.y += (playerVerticalVelocity.current * delta) / 1000;

    let onGround = false;
    for (const platform of playingField.platforms) {
      if (
        intersects(platform, {
          ...pos,
          width: PLAYER_WIDTH,
          height: PLAYER_HEIGHT,
        })
      ) {
        onGround = true;
        // place player firmly on ground even if slightly inside the platform
        pos.y = platform.y + platform.height;
        break;
      }
    }

    if (onGround) {
      playerVerticalVelocity.current = 0;
    } else {
      // update player velocity based on acceleration unless on ground
      playerVerticalVelocity.current += (-GRAVITY_ACCELERATION * delta) / 1000;
    }

    if (pos.y + PLAYER_HEIGHT < 0) {
      onFellOff();
    } else {
      playingField.fruits.forEach((fruit, index) => {
        if (
          intersects(
            { ...fruit, width: 0, height: 0 },
            { ...pos, width: PLAYER_WIDTH, height: PLAYER_HEIGHT }
          )
        ) {
          onTouchesFruit(index, fruit.points);
        }
      });
    }

    setPlayerPos(pos);
  });

  return {
    setPlayerVerticalVelocity: (v: number) =>
      (playerVerticalVelocity.current = v),
    playerPos,
    setPlayerPos,
  };
}
