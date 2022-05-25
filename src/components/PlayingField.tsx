import { FC, useState } from "react";
import Background from "./Background";
import Platform from "./Platform";
import Character from "./Character";
import Fruit from "./Fruit";
import { playingField } from "../playingFieldDefinition";
import usePhysicsController, {
  PLAYER_HEIGHT,
} from "../hooks/usePhysicsController";
import Points from "./Points";
import Lives from "./Lives";
import useFruitController from "../hooks/useFruitController";
import Flowers from "./Flowers";
import Ladder from "./Ladder";
import Tree from "./Tree";
import useKeyboardController from "../hooks/useKeyboardController";
import { useAnimationFrame } from "../hooks/useAnimationFrame";
import useScrollController from "../hooks/useScrollController";
import useGameController from "../hooks/useGameController";
import TutorialOne from "./TutorialOne";
import TutorialTwo from "./TutorialTwo";
import TutorialThree from "./TutorialThree";
import TutorialFour from "./TutorialFour";
import TutorialFive from "./TutorialFive";

const PlayingField: FC = () => {
  const [currentPoints, setPoints] = useState(0);
  const [currentLives, setLives] = useState(3);

  const {
    setPlayerVerticalVelocity,
    playerPos,
    setPlayerPos,
    jump,
    onGround,
    canGoLeft,
    canGoRight,
  } = usePhysicsController(playingField, () => {
    setPlayerPos(playingField.playerStart);
    console.log("fell off");
  });

  const [facing, setFacing] = useState<"left" | "right">("right");
  const { walk } = useKeyboardController(jump);
  useAnimationFrame((delta) => {
    const PIXEL_PER_MS = 1 / 8;
    if (walk === "left" && canGoLeft) {
      setPlayerPos((p) => ({ y: p.y, x: p.x - PIXEL_PER_MS * delta }));
      setFacing(walk);
    } else if (walk === "right" && canGoRight) {
      setPlayerPos((p) => ({ y: p.y, x: p.x + PIXEL_PER_MS * delta }));
      setFacing(walk);
    }
  });

    const { resetGame } = useGameController(setLives, setPoints, setPlayerPos);

    const { fruits, setTouchedFruits } = useFruitController(
    playingField.fruits,
    playerPos,
    (points) => {
      setPoints(currentPoints + points);
      console.log(currentPoints);
      if (currentPoints + points < 0 && points === -5) {
        setLives(currentLives - 1);
      }
      if (currentLives - 1 <= 0) {
        resetGame(setTouchedFruits);
      }
      console.log(`Touched fruit worth ${points} points`);
    }
  );

  // Player falling gets reset, works here falling works here!!
  let pos = { ...playerPos };
  if (pos.y + PLAYER_HEIGHT < 0) {
    setPlayerPos(playingField.playerStart);
    setLives(currentLives - 1);
    // should be in a new function!
    if (currentLives - 1 <= 0) {
      resetGame(setTouchedFruits);
      // setPoints(0);
      // setLives(3);
      // setPlayerPos(playingField.playerStart);
      // setTouchedFruits([]);
    }
  }

  let flowers = playingField.flowers;
  let ladders = playingField.ladders;
  let trees = playingField.trees;

  const scrollOffset = useScrollController({
    fieldWidth: playingField.width,
    playerPos,
  });

  return (
    <div
      style={{
        position: "relative",
        width: `${playingField.width}px`,
        height: "100%",
        left: -scrollOffset.x,
        bottom: -scrollOffset.y,
      }}
      // some placeholder interaction just to test the physics
      onDoubleClick={() => setPlayerVerticalVelocity(300)}
      onClick={(e) =>
        setPlayerPos({
          x: e.clientX,
          y: (e.target as HTMLDivElement).clientHeight - e.clientY,
        })
      }
    >
      {playingField.platforms.map((p, i) => (
        <Platform key={i} x={p.x} y={p.y} width={p.width} height={p.height} />
      ))}
      {flowers.map((f, i) => (
        <Flowers key={i} x={f.x} y={f.y} />
      ))}
      {ladders.map((f, i) => (
        <Ladder key={i} x={f.x} y={f.y} width={f.width} height={f.height} />
      ))}
      {trees.map((f, i) => (
        <Tree key={i} x={f.x} y={f.y} image={f.image} />
      ))}
      {fruits.map((f, i) => (
        <Fruit key={i} x={f.x} y={f.y} points={f.points} />
      ))}
      <Character
        x={playerPos.x}
        y={playerPos.y}
        jumping={!onGround}
        walking={walk !== null}
        facing={facing}
      />
      <div
        style={{
          // by using position fixed this div will be placed at the same place on
          // the screen, regardless of the offset of the rest of the playing field
          position: "fixed",
          top: 10,
          right: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
        className="playing-field-info"
      >
        <Lives lives={currentLives} />
        <Points points={currentPoints} />
      </div>
    </div>
  );
};
export default PlayingField;
