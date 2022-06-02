import { FC, useEffect, useRef, useState } from "react";
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
import SoundMuteUn from "./SoundMuteUn";
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
import ReactHowler from "react-howler";
import { HOWLER_VOLUME } from "../settings";
import JoyStickModule from "./JoyStickModule";

const PlayingField: FC<{
  field: PlayingFieldDefinition;
  showTutorial?: boolean;
  onFinished: (lives: number, points: number) => void;
}> = (props) => {
  const { field, showTutorial, onFinished } = props;

  const [currentPoints, setPoints] = useState(0);
  const [currentLives, setLives] = useState(3);
  const [tutorialStep, setTutorialStep] = useState(1);

  const gameOverSound = useRef(false);
  const pointDownSound = useRef(false);
  const pointUpSound = useRef(false);

  // Observing currentLives
  useEffect(() => {
    if (currentLives <= 0) {
      gameOverSound.current = true;
    }
  }, [currentLives]);

  // Game End
  useEffect(() => {
    if (gameOverSound)
      setTimeout(() => {
        setPoints(0);
        setLives(3);
        setPlayerPos(field.playerStart);
        setTouchedFruits([]);
        gameOverSound.current = false;
      }, 1000); // making delay before ReSet
  }, [gameOverSound]);

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

  useEffect(() => {
    if (currentLives <= 0) {
      gameOverSound.current = true;
    }
  }, [currentLives]);

  function setJoyStickWalk(d: string) {
    //console.log("joystickWalk  =>  " + d);
    if (d == "left" && joystickWalk != "left") {
      setJoystickWalk("left");
    } else if (d == "right" && joystickWalk != "right") {
      setJoystickWalk("right");
    } else if (d == "" && joystickWalk != null) {
      setJoystickWalk(null);
    }
  }
  const [walk, setwalk] = useState<null | "left" | "right">(null);
  const [joystickWalk, setJoystickWalk] = useState<null | "left" | "right">(
    null
  );
  const [facing, setFacing] = useState<"left" | "right">("right");
  const { keyboardWalk } = useKeyboardController(jump, () => {
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

  useEffect(() => {
    setwalk(keyboardWalk);
  }, [keyboardWalk]);
  useEffect(() => {
    setwalk(joystickWalk);
  }, [joystickWalk]);

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
      /*
      Playing sound on point Up / Down
      */
      pointUpSound.current = points > 0 ? true : false;

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
        <SoundMuteUn image={0} />
        <Lives lives={currentLives} />
        <Points points={currentPoints} />
      </div>

      <JoyStickModule jump={jump} onwalk={setJoyStickWalk} />

      <ReactHowler
        src="/sounds/background.mp3"
        preload={true}
        loop={true}
        html5={true}
        playing={true}
        volume={0.07}
      />

      <ReactHowler
        src="/sounds/gameOver.wav"
        preload={true}
        html5={true}
        loop={false}
        playing={gameOverSound.current}
        volume={HOWLER_VOLUME}
      />

      <ReactHowler
        src="/sounds/pointDown.wav"
        preload={true}
        html5={true}
        loop={false}
        playing={pointDownSound.current}
        volume={HOWLER_VOLUME}
        onEnd={() => {
          pointDownSound.current = false;
        }}
      />

      <ReactHowler
        src="/sounds/pointUp.wav"
        preload={true}
        html5={true}
        loop={false}
        playing={pointUpSound.current}
        volume={HOWLER_VOLUME}
        onEnd={() => {
          pointUpSound.current = false;
        }}
      />
    </div>
  );
};
export default PlayingField;
