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
    tutorialOne: {
      title: "How to move the character",
      desc1: "Move up, down, left, and right",
      desc2: "Jump!",
      next: "Next",
    },
    tutorialTwo: {
      title: "Collect as many points as possible",
      tomato: "= 5 points",
      banana: "= 10 points",
      eggplant: "= -5 points",
      back: "Back",
      next: "Next",
    },
    tutorialThree: {
      title: "Each player gets 3 lives",
      desc: "When points get negative, player will lose a life",
      back: "Back",
      next: "Next",
    },
    tutorialFour: {
      title: "If a player falls off the cliff, player will lose a life",
      back: "Back",
      next: "Next",
    },
    tutorialFive:{
      title: "Ready to win?",
      play: "Play now",
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
    tutorialOne: {
      title: "Hur man flyttar karaktären",
      desc1: "Flytta upp, ner, vänster och höger",
      desc2: "Hoppa!",
      next: "Nästa",
    },
    tutorialTwo: {
      title: "Samla så många poäng som möjligt",
      tomato: "= 5 poäng",
      banana: "= 10 poäng",
      eggplant: "= -5 poäng",
      back: "Tillbaka",
      next: "Nästa",
    },
    tutorialThree: {
      title: "Varje spelare får 3 liv",
      desc: "När poängen blir negativa kommer spelaren att förlora ett liv",
      back: "Tillbaka",
      next: "Nästa",
    },
    tutorialFour: {
      title: "Om en spelare faller från klippan kommer spelaren att förlora ett liv",
      back: "Tillbaka",
      next: "Nästa",
    },
    tutorialFive:{
      title: "Redo att vinna?",
      play: "Spela nu",
    },
  },
};
