import { createContext } from "react";

export type Locale = "en" | "sv";

export const LocaleContext = createContext<
  { locale: Locale; setLocale: (l: Locale) => void } | undefined
>(undefined);

type Messages = { [key: string]: string | Messages };

export const messages: Record<Locale, Messages> = {
  en: {
    title: "Capture the Fruits",
    info: {
      points: "Points: %{points}",
      lives: "Lives: %{lives}",
    },
    menu: {
      playNow: "Play now",
      tutorial: "Tutorial",
      play: "Play level %{index}",
    },
    afterGame: {
      youFinished:
        "You finished the game with %{points} points and %{lives} lives left",
      backToMenu: "Back to main menu",
    },
  },
  sv: {
    title: "Samla Frukterna",
    info: {
      points: "Poäng: %{points}",
      lives: "Liv: %{lives}",
    },
    menu: {
      playNow: "Spela nu",
      tutorial: "Guide",
      play: "Värld %{index}",
    },
    afterGame: {
      youFinished:
        "Du klarade spelet med %{points} poäng och %{lives} liv kvar",
      backToMenu: "Tillbaka till huvudmenyn",
    },
  },
};
