import { PlayingFieldDefinition } from "../playingFieldDefinition";
import { Position } from "../types";
import { useRef, useState } from "react";
import { useAnimationFrame } from "./useAnimationFrame";

export const PLAYER_WIDTH = 30;
export const PLAYER_HEIGHT = 60;
const GRAVITY_ACCELERATION = 200;

export function intersects(
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

  var results: Boolean =
    a_.left <= b_.right &&
    b_.left <= a_.right &&
    a_.bottom <= b_.top &&
    b_.bottom <= a_.top;
  return results;
}

export default function usePhysicsController(
  playingField: PlayingFieldDefinition,
  onFellOff: () => void
) {
  const [playerPos, setPlayerPos] = useState<Position>(
    playingField.playerStart
  );
  const [onGround, setOnGround] = useState(false);
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

    setOnGround(onGround);

    if (pos.y + PLAYER_HEIGHT < 0) {
      onFellOff();
    }

    setPlayerPos(pos);
  });

  return {
    setPlayerVerticalVelocity: (v: number) =>
      (playerVerticalVelocity.current = v),
    playerPos,
    setPlayerPos,
    onGround,
  };
}
