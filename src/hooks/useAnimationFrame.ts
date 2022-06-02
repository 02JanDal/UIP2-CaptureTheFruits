import { useCallback, useEffect, useRef } from "react";

/**
 * File: UseAnimationFrame.ts
 *
 * This file contains the React hooks to animate certain elements.
 * In our case, for example, to animate the character movement when
 * the character moves or falls from the sky.
 *
 * The code is based from:
 * https://css-tricks.com/using-requestanimationframe-with-react-hooks/
 *
 */
export const useAnimationFrame = (
  callback: (time: DOMHighResTimeStamp) => void
) => {
  const requestRef = useRef<number | undefined>();
  const previousTimeRef = useRef<DOMHighResTimeStamp | undefined>();

  const animate = useCallback(
    (time: DOMHighResTimeStamp) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [callback]
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);
};
