export interface PlayingFieldDefinition {
  width: number;
  playerStart: { x: number; y: number };
  platforms: { x: number; y: number; width: number; height: number }[];
  fruits: { x: number; y: number; points: number }[];
  trees: {x: number, y: number, width: number, height: number}[];
  flowers: {x: number, y:number, width:number, height: number}[];
  ladders: {x: number, y:number, width: number, height:number}[];
  clouds: {x: number, y:number, width: number, height: number}[];
}

export const playingField: PlayingFieldDefinition = {
  width: 1500,
  playerStart: { x: 50, y: 500 },
  platforms: [
    { x: 0, y: 0, width: 500, height: 100 },
    { x: 500, y: 0, width: 500, height: 150 },
    { x: 1100, y: 0, width: 400, height: 100 },
    { x: 200, y: 200, width: 200, height: 50 },
  ],
  fruits: [
    // fruits on the flying platform
    { x: 200, y: 270, points: -5 },
    { x: 250, y: 270, points: -5 },
    { x: 300, y: 270, points: -5 },
    { x: 350, y: 270, points: 10 },
    { x: 400, y: 270, points: 10 },
    // fruits on the ground
    { x: 200, y: 120, points: -5 },
    { x: 250, y: 120, points: 5 },
    { x: 300, y: 120, points: 5 },
    { x: 350, y: 120, points: 5 },
    { x: 400, y: 120, points: 5 },
    { x: 450, y: 120, points: -5 },
  ],
  trees: [],
  flowers: [],
  ladders: [],
  clouds: [],
};
