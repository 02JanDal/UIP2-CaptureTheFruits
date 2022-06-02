import { FC, useState } from "react";
import Background from "./Background";
import Platform from "./Platform";
import Character from "./Character";
import Fruit from "./Fruit";
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
import { PlayingFieldDefinition } from "../playingFieldDefinition";
import ExitDoor from "./ExitDoor";
import HelpButton from "./HelpButton";
import EndButton from "./EndButton";
import {useNavigate} from "react-router-dom";

const PlayingField: FC<{
  field: PlayingFieldDefinition;
  showTutorial?: boolean;
  onFinished: (lives: number, points: number) => void;
}> = (props) => {
  const { field, showTutorial, onFinished } = props;

  const [currentPoints, setPoints] = useState(0);
  const [currentLives, setLives] = useState(3);
  const [tutorialStep, setTutorialStep] = useState(1);

  const {
    setPlayerVerticalVelocity,
    playerPos,
    setPlayerPos,
    jump,
    onGround,
    canGoLeft,
    canGoRight,
    atExit,
  } = usePhysicsController(field, () => {
    setPlayerPos(field.playerStart);
    console.log("fell off");
  });

  const [facing, setFacing] = useState<"left" | "right">("right");
  const { walk } = useKeyboardController(jump, () => {
    if (atExit) {
      console.log(
        "Finished game with",
        currentPoints,
        "points and",
        currentLives,
        "lives"
      );
      onFinished(currentLives, currentPoints);
    }
  });
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

  const { resetGame } = useGameController(
    field,
    setLives,
    setPoints,
    setPlayerPos
  );

    const navigate = useNavigate();
    const { fruits, setTouchedFruits } = useFruitController(
    field.fruits,
    playerPos,
    (points) => {
      setPoints(currentPoints + points);
      console.log(currentPoints);
      if (currentPoints + points < 0 && points === -5) {
        setLives(currentLives - 1);
      }
      if (currentLives - 1 <= 0) {
        resetGame(setTouchedFruits);
        navigate("/lose-game");
      }
      console.log(`Touched fruit worth ${points} points`);
    }
  );

  // Player falling gets reset, works here falling works here!!
  let pos = { ...playerPos };
  if (pos.y + PLAYER_HEIGHT < 0) {
    setPlayerPos(field.playerStart);
    setLives(currentLives - 1);
    // should be in a new function!
    if (currentLives - 1 <= 0) {
      resetGame(setTouchedFruits);
      navigate("/lose-game");
    }
  }

  const { flowers, ladders, trees, platforms } = field;

  const scrollOffset = useScrollController({
    fieldWidth: field.width,
    playerPos,
  });

  return (
    <div
      style={{
        position: "relative",
        width: `${field.width}px`,
        height: "100%",
        left: -scrollOffset.x,
        bottom: -scrollOffset.y,
      }}
      onClick={(e) => {
          let el = e.target as HTMLElement | null;
          while (el && !el.classList.contains("talk-bubble") && !el.classList.contains("help")) {
              el = el.parentElement;
          }
          if (!el) {
              setTutorialStep(0);
          }
      }}
    >
        <HelpButton showTutorial={() => setTutorialStep(1)}/>
        <EndButton/>
      {platforms.map((p, i) => (
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
      <ExitDoor x={field.exit.x} y={field.exit.y} />
      {}
      <Character
        x={playerPos.x}
        y={playerPos.y}
        jumping={!onGround}
        walking={
          (walk === "left" && canGoLeft) || (walk === "right" && canGoRight)
        }
        facing={facing}
      />
        {showTutorial && tutorialStep === 1? <TutorialOne onNext={() => setTutorialStep(2)} onClose={() => setTutorialStep(0)}/> :
            showTutorial && tutorialStep === 2? <TutorialTwo onNext={() => setTutorialStep(3)} onBack={() => setTutorialStep(1)} onClose={() => setTutorialStep(0)}/> :
                showTutorial && tutorialStep === 3? <TutorialThree onNext={() => setTutorialStep(4)} onBack = {() => setTutorialStep(2)} onClose={() => setTutorialStep(0)}/> :
                    showTutorial && tutorialStep === 4? <TutorialFour onNext={() => setTutorialStep(5)} onBack ={() => setTutorialStep(3)} onClose={() => setTutorialStep(0)}/> :
            showTutorial && tutorialStep === 5? <TutorialFive onNext={() => setTutorialStep(6)} onClose={() => setTutorialStep(0)}/> : null}
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
