import { Position } from "../types";
import useWindowSize from "./useWindowSize";

/**
 * The function clamp is the helper function to calculate the x position
 * that the playing field should scroll.
 *
 * @param number The number
 * @param min The minimum value
 * @param max The maximum value
 */
function clamp(number: number, min: number, max: number) {
  return Math.max(min, Math.min(number, max));
}

/**
 * File: useController.ts
 *
 * This file contains a React hook that returns the offset the playing
 * field should be scrolled by. It tries to keep the player in the
 * center but without going "outside" of the playing field.
 * @param props The fieldWidth (the width of the field) and the playerPos (player's position)
 *
 */
export default function useScrollController(props: {
  fieldWidth: number;
  playerPos: Position;
}) {
  // Checking the current window size
  const window = useWindowSize();

  // If it goes beyond the current window size, then we set
  // the x and y position to 0
  if (!window) {
    return { x: 0, y: 0 };
  }

  // Calculate the x and y of the offset of the playing field should scroll by
  // using the clamp function helper defined previously
  return {
    x: clamp(props.playerPos.x - window.width / 2, 0, props.fieldWidth),
    y: Math.max(props.playerPos.y - window.height / 2, 0),
  };
}
