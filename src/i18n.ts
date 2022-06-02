import { createContext } from "react";

/**
 * File: i18n.ts
 *
 * This file contains the dictionary of all the strings/texts
 * used in the game.
 *
 * The two main languages used are English and Swedish
 */
export type Locale = "en" | "sv";

// Creating the locale to be either english or swedish
export const LocaleContext = createContext<
  { locale: Locale; setLocale: (l: Locale) => void } | undefined
>(undefined);

// The dictionary is strings
type Messages = { [key: string]: string | Messages };

// Creating the dictionary in English and Swedish
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
      mute: "Mute music",
      unmute: "Play music",
    },
    afterGame: {
      congratulations: "Congratulations!",
      youFinished: "Congratulations! You finished the game with:",
      statistics: "Points: %{points} and Lives: %{lives} ",
      left: "left",
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
    loseGame: {
      title: "Oh no!",
      playAgain: "You ran out of lives! Play again?",
      playButton: "Play again",
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
    tutorialFive: {
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
      setEnglish: "Engelska",
      setSwedish: "Svenska",
      mute: "Pausa musik",
      unmute: "Spela musik",
    },
    afterGame: {
      congratulations: "Grattis!",
      youFinished: "Grattis! Du klarade spelet med ",
      statistics: "Poäng: %{points} och liv: %{lives}",
      left: "kvar",
      backToMenu: "Tillbaka till huvudmenyn",
      enterNameForLeaderboard:
        "Ange ditt namn för att läggas till på topplistan",
      save: "Spara",
    },
    loseGame: {
      title: "Å nej!",
      playAgain: "Du fick slut på liv! Spela igen?",
      playButton: "Spela igen",
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
      title:
        "Om en spelare faller från klippan kommer spelaren att förlora ett liv",
      back: "Tillbaka",
      next: "Nästa",
    },
    tutorialFive: {
      title: "Redo att vinna?",
      play: "Spela nu",
    },
  },
};
