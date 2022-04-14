// based on code from https://css-tricks.com/using-requestanimationframe-with-react-hooks/
import { useCallback, useEffect, useRef } from "react";

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
