import { createContext, useContext } from "react";

export const SoundContext = createContext<
  { muted: boolean; setMuted: (muted: boolean) => void } | undefined
>(undefined);

export const useSound = () => useContext(SoundContext)!;
