import { PlayingFieldDefinition } from "../../playingFieldDefinition";

export const playingField2: PlayingFieldDefinition = {
  width: 500,
  playerStart: { x: 50, y: 150 },
  exit: { x: 50, y: 850 },
  platforms: [
    { x: 0, y: 0, width: 500, height: 100 },
    { x: 0, y: 200, width: 200, height: 50 },
    { x: 0, y: 350, width: 150, height: 50 },
    { x: 350, y: 350, width: 150, height: 50 },
    { x: 150, y: 500, width: 200, height: 50 },
    { x: 300, y: 650, width: 200, height: 50 },
    { x: 0, y: 800, width: 200, height: 50 },
  ],
  fruits: [
    { x: 30, y: 420, points: 10 },
    { x: 80, y: 420, points: -5 },
    { x: 130, y: 420, points: -5 },
    { x: 480, y: 120, points: 10 },
    { x: 250, y: 120, points: 5 },
    { x: 300, y: 120, points: -5 },
    { x: 240, y: 570, points: 5 },
    { x: 290, y: 570, points: -5 },
    { x: 340, y: 570, points: 5 },
    { x: 480, y: 420, points: 10 },
    { x: 30, y: 870, points: 10 },
  ],
  trees: [{ x: 400, y: 180, image: 0 }],
  flowers: [
    { x: 60, y: 260 },
    { x: 380, y: 410 },
    { x: 450, y: 410 },
    { x: 200, y: 560 },
    { x: 400, y: 710 },
  ],
  ladders: [{ x: 150, y: 170, width: 90, height: 170 }],
  clouds: [],
};
