import { createContext, useContext } from "react";

/**
 * File: sound.ts
 *
 * This file contains the sound context to initialize
 * the sound later.
 */
export const SoundContext = createContext<
  { muted: boolean; setMuted: (muted: boolean) => void } | undefined
>(undefined);

export const useSound = () => useContext(SoundContext)!;
