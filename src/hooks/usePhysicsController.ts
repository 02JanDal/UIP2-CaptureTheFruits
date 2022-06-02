import { PlayingFieldDefinition } from "../playingFieldDefinition";
import { Position } from "../types";
import { useRef, useState } from "react";
import { useAnimationFrame } from "./useAnimationFrame";
import { DOOR_SIZE } from "../components/ExitDoor";

/**
 * File: usePhysicsController.ts
 *
 * This file contains two different functions:
 * (1) The intersects function and
 * (2) The usePhysicsController function
 * which will be explained below
 *
 */
// Set the constant of the player's width, height,
// gravity acceleration, and jump velocity
export const PLAYER_WIDTH = 30;
export const PLAYER_HEIGHT = 60;
const GRAVITY_ACCELERATION = 1000;
const JUMP_VELOCITY = 600;

/**
 * The function that determines whether the two "elements"
 * in the playing field are intersecting
 * @param a The first element
 * @param b The second element
 */
export function intersects(
  a: { x: number; y: number; width: number; height: number },
  b: { x: number; y: number; width: number; height: number }
) {
  // The first element's position defined in variables
  // left, right, bottom, and top
  const a_ = {
    left: a.x,
    right: a.x + a.width,
    bottom: a.y,
    top: a.y + a.height,
  };
  // The second elements' position defined in variables
  // left, right, bottom, and top
  const b_ = {
    left: b.x,
    right: b.x + b.width,
    bottom: b.y,
    top: b.y + b.height,
  };

  // Return to check whether element a and b
  // are indeed intersecting with each other
  // by comparing their left, right, bottom, and top
  // values
  return (
    a_.left <= b_.right &&
    b_.left <= a_.right &&
    a_.bottom <= b_.top &&
    b_.bottom <= a_.top
  );
}

/**
 *
 * This function is a React hook to control the "physics"
 * of the player. For example, whether the player is on the ground,
 * jumping, falling from the sky, can go to the left/right,
 * or whether the player is at the exit door to complete the game.
 *
 * @param playingField The playing field
 * @param onFellOff The function that is executed when a player fell off the cliff/valley. In this case,
 * the player will return to the beginning of the game.
 */
export default function usePhysicsController(
  playingField: PlayingFieldDefinition,
  onFellOff: () => void
) {
  // State the initial position of the player, which is at the start/beginning
  // as stated in the playingField file
  const [playerPos, setPlayerPos] = useState<Position>(
    playingField.playerStart
  );

  // State whether the player is on ground or not initially, which is initially false
  const [onGround, setOnGround] = useState(false);

  // State whether the player can go to the left, which is initially true
  const [canGoLeft, setCanGoLeft] = useState(true);

  // State whether the player can go to the right, which is initially true
  const [canGoRight, setCanGoRight] = useState(true);

  // State whether the player is at the exit, which is initially false
  const [atExit, setAtExit] = useState(false);

  // State the players' vertical velocity, which is initially at 0
  const playerVerticalVelocity = useRef(0);

  // Using the useAnimationFrame hook to animate the player's movement
  // when it was initially falling from the sky
  useAnimationFrame((delta) => {
    let pos = { ...playerPos };

    // We update player y's position based on velocity
    pos.y += (playerVerticalVelocity.current * delta) / 1000;

    // Setting the player's current position and size
    const playerRect = {
      ...pos,
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
    };

    // Setting the onGround to false (since player is first falling from the sky
    let onGround = false;

    // Setting that the player can go to the left and right
    let canLeft = true;
    let canRight = true;

    // For each platform that the player intersects with,
    // we are interested in which side of the platform of the player is the "least"
    // amount inside, because that's the direction in which we will push them
    for (const platform of playingField.platforms) {
      if (intersects(platform, playerRect)) {
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

    // If the player is onGround, then we are setting the player's velocity to 0
    if (onGround) {
      playerVerticalVelocity.current = 0;
    } else {
      // Update player velocity based on acceleration unless on ground
      playerVerticalVelocity.current += (-GRAVITY_ACCELERATION * delta) / 1000;
    }

    // If the player is moving off the screen (Falling off the cliff/valley), then
    // we execute the onFellOff() that will be defined when the usePhysicsController
    // hook is first initialized
    if (pos.y + PLAYER_HEIGHT < 0) {
      onFellOff();
    }

    // The player cannot go to the left if it already reaches the end of the left screen
    if (pos.x < 0) {
      pos.x = 0;
      canLeft = false;
      // The player cannot go to the right if it already reaches the end of the right screen
    } else if (pos.x + PLAYER_WIDTH > playingField.width) {
      pos.x = playingField.width - PLAYER_WIDTH;
      canRight = false;
    }

    // Checking if the player "intersects" with the exit door, meaning whether the player
    // has reached the exit door.
    const atExit = intersects(
      { ...playingField.exit, width: DOOR_SIZE, height: DOOR_SIZE },
      playerRect
    );

    // Continuously updating the respective setter to the user's current position and current abilities in the game:
    // whether they are on the ground, can go left, can go right, can go right, and at the exit door
    setOnGround(onGround);
    setCanGoLeft(canLeft);
    setCanGoRight(canRight);
    setAtExit(atExit);
    setPlayerPos(pos);
  });

  // Returning the setPlayerVerticalVelocity function, the jump function (which will increase the users' velocity and change position),
  // the player position, the setter of player position, boolean of whether the user is on the ground, can go left, can go right,
  // or at the exit door
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
    atExit,
  };
}
