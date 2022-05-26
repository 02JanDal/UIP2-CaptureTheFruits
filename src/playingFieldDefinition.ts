export interface PlayingFieldDefinition {
  width: number;
  playerStart: { x: number; y: number };
  platforms: { x: number; y: number; width: number; height: number }[];
  fruits: { x: number; y: number; points: number }[];
  trees: { x: number; y: number; image: number }[];
  flowers: { x: number; y: number }[];
  ladders: { x: number; y: number; width: number; height: number }[];
  clouds: { x: number; y: number; width: number; height: number }[];
}
