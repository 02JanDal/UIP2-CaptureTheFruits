/**
 * File: playingFieldDefinition.ts
 *
 * This file contains the interface of the "dictionary" of the playing field, which includes
 * the position of the player, exit door, platforms, fruits, etc.
 */
export interface PlayingFieldDefinition {
  width: number;
  playerStart: { x: number; y: number };
  exit: { x: number; y: number };
  platforms: { x: number; y: number; width: number; height: number }[];
  fruits: { x: number; y: number; points: number }[];
  trees: { x: number; y: number; image: number }[];
  flowers: { x: number; y: number }[];
  ladders: { x: number; y: number; width: number; height: number }[];
  clouds: { x: number; y: number; width: number; height: number }[];
}
