import { createContext } from "react";

export type Locale = "en" | "sv";

export const LocaleContext = createContext<
  { locale: Locale; setLocale: (l: Locale) => void } | undefined
>(undefined);

type Messages = { [key: string]: string | Messages };

export const messages: Record<Locale, Messages> = {
  en: {
    info: {
      points: "Points: %{points}",
      lives: "Lives: %{lives}",
    },
  },
  sv: {
    info: {
      points: "Poäng: %{points}",
      lives: "Liv: %{lives}",
    },
  },
};
