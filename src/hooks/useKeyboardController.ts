import { useEffect, useState } from "react";

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
