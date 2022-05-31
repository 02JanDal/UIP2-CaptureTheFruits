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
      setEnglish: "English",
      setSwedish: "Swedish",
    },
    afterGame: {
      youFinished:
        "You finished the game with %{points} points and %{lives} lives left",
      backToMenu: "Back to main menu",
      enterNameForLeaderboard: "Enter your name to be added to the leaderboard",
      save: "Save",
    },
    leaderboard: {
      title: "Leaderboard",
      name: "Name",
      field: "Level",
      points: "Points",
      lives: "Lives left",
      date: "Date",
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
      setEnglish: "Engelska",
      setSwedish: "Svenska",
    },
    afterGame: {
      youFinished:
        "Du klarade spelet med %{points} poäng och %{lives} liv kvar",
      backToMenu: "Tillbaka till huvudmenyn",
      enterNameForLeaderboard:
        "Ange ditt namn för att läggas till på topplistan",
      save: "Spara",
    },
    leaderboard: {
      title: "Topplistan",
      name: "Namn",
      field: "Värld",
      points: "Poäng",
      lives: "Liv kvar",
      date: "Datum",
    },
  },
};
