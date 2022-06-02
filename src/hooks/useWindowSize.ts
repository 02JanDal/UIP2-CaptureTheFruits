import { useEffect, useState } from "react";

/**
 * File: useWindowSize.ts
 *
 * This file contains the React hook that returns the current window size of the player
 * running on different machine.
 *
 * Based on: https://usehooks.com/useWindowSize/
 */
export default function useWindowSize() {

  // Setting the window size (the height and width)
  const [windowSize, setWindowSize] = useState<
    undefined | { width: number; height: number }
  >(undefined);

  // Update the window size based on the users' current resize of the window
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  // Returns the window size
  return windowSize;
}
