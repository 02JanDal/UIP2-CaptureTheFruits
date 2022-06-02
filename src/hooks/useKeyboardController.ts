import { useEffect, useState } from "react";

/**
 * File: useKeyboardController.ts
 *
 * This file contains the React hook to the keyboard controller
 * for the user to move the player around in the game.
 *
 * @param onJump The function jump that triggers the character's speed/velocity and position change
 * @param onUseObject The function onUseObject that triggers the current lives and points are recorded and that the game is reset
 * when the user completes the game
 */

export default function useKeyboardController(
  onJump: () => void,
  onUseObject: () => void
) {
  const [keyboardWalk, setKeyboardWalk] = useState<null | "left" | "right">(null);
  const [leftDown, setLeftDown] = useState(false);
  const [rightDown, setRightDown] = useState(false);

  const downHandler = ({ code }: KeyboardEvent) => {
    if (code === "ArrowLeft") {
      setKeyboardWalk("left");
      setLeftDown(true);
    } else if (code === "ArrowRight") {
      setKeyboardWalk("right");
      setRightDown(true);
    } else if (code === "Space") {
      onJump();
    } else if (code === "ArrowUp") {
      onUseObject();
    }
  };
  const upHandler = ({ code }: KeyboardEvent) => {
    if (code === "ArrowLeft") {
      setLeftDown(false);
      setKeyboardWalk(rightDown ? "right" : null);
    } else if (code === "ArrowRight") {
      setRightDown(false);
      setKeyboardWalk(leftDown ? "left" : null);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    return () => {
      // these get called when the component is unmounted
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  });

  return { keyboardWalk };
}
