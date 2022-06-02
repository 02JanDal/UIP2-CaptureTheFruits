import { createContext, useContext } from "react";

/**
 * File: leaderboard.ts
 *
 * This file contains several functions to access
 * or create the leaderboard.
 */

// The interface of the leaderboard
export type Leaderboard = {
  name: string;
  field: number;
  lives: number;
  points: number;
  date: Date;
}[];

/**
 * The function to add the date of the score noted in leaderboard
 *
 * @param str The string
 */
export function deserializeLeaderboard(str: string): Leaderboard {
  return JSON.parse(str, (key, value) =>
    key === "date" ? new Date(value) : value
  );
}

/**
 * The function to turn the date of the score noted in the leaderboard
 * to string
 *
 * @param lb The leaderboard
 */
export function serializeLeaderboard(lb: Leaderboard) {
  return JSON.stringify(lb, (key, value) =>
    key === "date" ? value.toString() : value
  );
}

/**
 * The function to create the leaderboard
 */
export const LeaderboardContext = createContext<
  | { leaderboard: Leaderboard; setLeaderboard: (l: Leaderboard) => void }
  | undefined
>(undefined);

/**
 * The function that returns the leaderboard
 */
export const useLeaderboard = () => {
  const ctx = useContext(LeaderboardContext);
  if (!ctx) {
    return [];
  }
  return ctx.leaderboard;
};

/**
 * The function that sets the leaderboard
 */
export const useSetLeaderboard = () => {
  const ctx = useContext(LeaderboardContext);
  if (!ctx) {
    return (_board: Leaderboard) => {};
  }
  return ctx.setLeaderboard;
};

/**
 * The function that appends the leaderboard with a new added score
 */
export const useAppendLeaderboard = () => {
  const ctx = useContext(LeaderboardContext);
  if (!ctx) {
    return (_item: Leaderboard[number]) => {};
  }
  return (item: Leaderboard[number]) => {
    ctx.setLeaderboard([...ctx.leaderboard, item]);
  };
};
