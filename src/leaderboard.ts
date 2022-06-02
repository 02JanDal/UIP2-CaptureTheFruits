import { createContext, useContext } from "react";

export type Leaderboard = {
  name: string;
  field: number;
  lives: number;
  points: number;
  date: Date;
}[];

export function deserializeLeaderboard(str: string): Leaderboard {
  return JSON.parse(str, (key, value) =>
    key === "date" ? new Date(value) : value
  );
}
export function serializeLeaderboard(lb: Leaderboard) {
  return JSON.stringify(lb, (key, value) =>
    key === "date" ? value.toString() : value
  );
}

export const LeaderboardContext = createContext<
  | { leaderboard: Leaderboard; setLeaderboard: (l: Leaderboard) => void }
  | undefined
>(undefined);

export const useLeaderboard = () => {
  const ctx = useContext(LeaderboardContext);
  if (!ctx) {
    return [];
  }
  return ctx.leaderboard;
};
export const useSetLeaderboard = () => {
  const ctx = useContext(LeaderboardContext);
  if (!ctx) {
    return (_board: Leaderboard) => {};
  }
  return ctx.setLeaderboard;
};
export const useAppendLeaderboard = () => {
  const ctx = useContext(LeaderboardContext);
  if (!ctx) {
    return (_item: Leaderboard[number]) => {};
  }
  return (item: Leaderboard[number]) => {
    ctx.setLeaderboard([...ctx.leaderboard, item]);
  };
};
