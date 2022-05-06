import { Position } from "../types";
import useWindowSize from "./useWindowSize";

function clamp(number: number, min: number, max: number) {
  return Math.max(min, Math.min(number, max));
}

/**
 * Returns the offset the playing field should be scrolled by.
 *
 * Tries to keep the player in the center but without going
 * "outside" of the playing field.
 */
export default function useScrollController(props: {
  fieldWidth: number;
  playerPos: Position;
}) {
  const window = useWindowSize();

  if (!window) {
    return { x: 0, y: 0 };
  }

  return {
    x: clamp(props.playerPos.x - window.width / 2, 0, props.fieldWidth),
    y: Math.max(props.playerPos.y - window.height / 2, 0),
  };
}
