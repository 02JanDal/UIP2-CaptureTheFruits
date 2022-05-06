export interface PlayingFieldDefinition {
  width: number;
  playerStart: { x: number; y: number };
  points: {x: number, y: number, width: number, height: number};
  lives: {x: number, y: number, width: number, height: number };
  platforms: { x: number; y: number; width: number; height: number }[];
  fruits: { x: number; y: number; points: number }[];
  trees: {x: number, y: number, width: number, height: number}[];
  flowers: {x: number, y:number }[];
  ladders: {x: number, y:number, width: number, height:number}[];
  clouds: {x: number, y:number, width: number, height: number}[];
}

export const playingField: PlayingFieldDefinition = {
  width: 1500,
  playerStart: { x: 50, y: 500 },
  points: {x: window.innerWidth - 200, y:window.innerHeight - 120, width: 50, height: 100},
  lives: {x: window.innerWidth - 120, y: window.innerHeight - 120, width: 50, height: 100},
  platforms: [
    { x: 0, y: 0, width: 500, height: 100 },
    { x: 500, y: 0, width: 500, height: 150 },
    { x: 1100, y: 0, width: 400, height: 100 },
    { x: 200, y: 200, width: 200, height: 50 },
    { x: 500, y: 300, width: 200, height: 50 },
    { x: 800, y: 400, width: 200, height: 50 },
    { x: 1200, y: 200, width: 200, height: 50 },
  ],
  fruits: [
    // fruits on the flying platform
    { x: 250, y: 270, points: 10 },
    { x: 300, y: 270, points: -5 },
    { x: 350, y: 270, points: -5 },
    // fruits on the ground left
    { x: 200, y: 120, points: -5 },
    { x: 250, y: 120, points: 5 },
    { x: 300, y: 120, points: 5 },
    { x: 350, y: 120, points: 5 },
    { x: 400, y: 120, points: 5 },
    { x: 450, y: 120, points: -5 },
    // fruits on the ground middle
    { x: 550, y: 170, points: -5 },
    { x: 600, y: 170, points: -5 },
    { x: 650, y: 170, points: 10 },
    { x: 700, y: 170, points: 5 },
    { x: 750, y: 170, points: 10 },
    { x: 800, y: 170, points: 5 },
    { x: 850, y: 170, points: 5 },
    { x: 900, y: 170, points: -5 },
    { x: 950, y: 170, points: -5 },
    // fruits on the ground right
    { x: 1150, y: 120, points: -5 },
    { x: 1200, y: 120, points: 5 },
    { x: 1250, y: 120, points: 5 },
    { x: 1300, y: 120, points: 10 },
    { x: 1350, y: 120, points: 10 },
    { x: 1400, y: 120, points: -5 },
    { x: 1450, y: 120, points: -5 },

  ],
  trees: [],
  flowers: [
    { x: 480, y: 100 },
    { x: 380, y: 250 },
    { x: 520, y: 350 },
    { x: 680, y: 350 },
    { x: 850, y: 450 },
    { x: 1250, y: 250 },
  ],
  ladders: [
    { x: 250, y: 160, width: 90, height: 170 },
    { x: 1250, y: 160, width: 90, height: 170 },
  ],
  clouds: [],
};
