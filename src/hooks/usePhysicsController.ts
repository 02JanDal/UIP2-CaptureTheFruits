import { PlayingFieldDefinition } from "../playingFieldDefinition";
import { Position } from "../types";
import { useRef, useState } from "react";
import { useAnimationFrame } from "./useAnimationFrame";

export const PLAYER_WIDTH = 30;
export const PLAYER_HEIGHT = 60;
const GRAVITY_ACCELERATION = 1000;
const JUMP_VELOCITY = 600;

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

  return (
    a_.left <= b_.right &&
    b_.left <= a_.right &&
    a_.bottom <= b_.top &&
    b_.bottom <= a_.top
  );
}

export default function usePhysicsController(
  playingField: PlayingFieldDefinition,
  onFellOff: () => void
) {
  const [playerPos, setPlayerPos] = useState<Position>(
    playingField.playerStart
  );
  const [onGround, setOnGround] = useState(false);
  const [canGoLeft, setCanGoLeft] = useState(true);
  const [canGoRight, setCanGoRight] = useState(true);
  const playerVerticalVelocity = useRef(0);

  useAnimationFrame((delta) => {
    let pos = { ...playerPos };

    // update player y position based on velocity
    pos.y += (playerVerticalVelocity.current * delta) / 1000;

    let onGround = false;
    let canLeft = true;
    let canRight = true;
    for (const platform of playingField.platforms) {
      if (
        intersects(platform, {
          ...pos,
          width: PLAYER_WIDTH,
          height: PLAYER_HEIGHT,
        })
      ) {
        /* We're interested in which side of the platform the player is the "least"
         * amount inside, because that's the direction in which we will push them.
         */
        const insideLeft = pos.x + PLAYER_WIDTH - platform.x;
        const insideRight = platform.x + platform.width - pos.x;
        const insideBottom = pos.y + PLAYER_HEIGHT - platform.y;
        const insideTop = platform.y + platform.height - pos.y;
        if (
          insideLeft < insideRight &&
          insideLeft < insideBottom &&
          insideLeft < insideTop
        ) {
          pos.x = platform.x - PLAYER_WIDTH;
          canRight = false;
        } else if (
          insideRight < insideLeft &&
          insideRight < insideBottom &&
          insideRight < insideTop
        ) {
          pos.x = platform.x + platform.width;
          canLeft = false;
        } else if (
          insideBottom < insideRight &&
          insideBottom < insideLeft &&
          insideBottom < insideTop
        ) {
          pos.y = platform.y - PLAYER_HEIGHT;
          playerVerticalVelocity.current = 0;
        } else if (
          insideTop < insideRight &&
          insideTop < insideBottom &&
          insideTop < insideLeft
        ) {
          pos.y = platform.y + platform.height;
          playerVerticalVelocity.current = 0;
          onGround = true;
        }
      }
    }
    setCanGoLeft(canLeft);
    setCanGoRight(canRight);

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
    jump: () => {
      if (playerVerticalVelocity.current <= 0 && onGround) {
        playerVerticalVelocity.current = JUMP_VELOCITY;
      }
    },
    playerPos,
    setPlayerPos,
    onGround,
    canGoLeft,
    canGoRight,
  };
}
