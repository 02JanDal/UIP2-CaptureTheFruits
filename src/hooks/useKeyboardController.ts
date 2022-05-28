import { useEffect, useState } from "react";

export default function useKeyboardController(onJump: () => void) {
  const [walk, setWalk] = useState<null | "left" | "right">(null);
  const [leftDown, setLeftDown] = useState(false);
  const [rightDown, setRightDown] = useState(false);

  const downHandler = ({ code }: KeyboardEvent) => {
    if (code === "ArrowLeft") {
      setWalk("left");
      setLeftDown(true);
    } else if (code === "ArrowRight") {
      setWalk("right");
      setRightDown(true);
    } else if (code === "Space" || code === "ArrowUp") {
      onJump();
    }
  };
  const upHandler = ({ code }: KeyboardEvent) => {
    if (code === "ArrowLeft") {
      setLeftDown(false);
      setWalk(rightDown ? "right" : null);
    } else if (code === "ArrowRight") {
      setRightDown(false);
      setWalk(leftDown ? "left" : null);
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

  return { walk };
}
