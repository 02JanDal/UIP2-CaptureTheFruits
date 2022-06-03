import {FC, useEffect, useRef, useState} from "react";
import Platform from "./Platform";
import Character from "./Character";
import Fruit from "./Fruit";
import usePhysicsController from "../hooks/usePhysicsController";
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
import { useNavigate } from "react-router-dom";
import ReactHowler from "react-howler";
import { HOWLER_VOLUME } from "../settings";
import JoyStickModule from "./JoyStickModule";

/**
 * File: PlayingField.tsx
 *
 * The file contains the main playing field that the user
 * will play in. It consists of all the components/elements
 * of the game such as the character, the fruits, the tutorial system,
 * the lives and points counter, and the joystick.
 *
 * @param props The field data, the showTutorial boolean (whether
 * the tutorial is shown), and the onFinished function that will be executed
 * when the user completes the game
 *
 * @constructor The PlayingField file
 */
const PlayingField: FC<{
  field: PlayingFieldDefinition;
  showTutorial?: boolean;
  onFinished: (lives: number, points: number) => void;
}> = (props) => {

  // The field data of all components, the showTutorial boolean, and the onFinished function
  const { field, showTutorial, onFinished } = props;

  // Setting the step number
  const [tutorialStep, setTutorialStep] = useState(1);

  const pointDownSound = useRef(false);
  const pointUpSound = useRef(false);

  const [isMobile, setIsMobile] = useState(false)
  const handleResize = () => {
    if (window.innerWidth <= 425) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

// create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })

  const {
    playerPos,
    setPlayerPos,
    jump,
    onGround,
    canGoLeft,
    canGoRight,
    atExit,
  } = usePhysicsController(field, () => {
    setPlayerPos(field.playerStart);
    looseLife();
  });

  const onUseObject = () => {
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
  };

  const [joystickWalk, setJoystickWalk] = useState<null | "left" | "right">(
    null
  );
  const { keyboardWalk } = useKeyboardController(jump, onUseObject);
  const walk = keyboardWalk || joystickWalk;

  const [facing, setFacing] = useState<"left" | "right">("right");
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

  const { looseLife, currentPoints, currentLives, setPoints } =
    useGameController(field, setPlayerPos, () => {
      navigate("/lose-game");
    });

  const navigate = useNavigate();
  const { fruits } = useFruitController(field.fruits, playerPos, (points) => {
    setPoints(currentPoints + points);
    // Playing sound on point Up / Down
    pointUpSound.current = points > 0;
    pointDownSound.current = points < 0;
  });

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
        while (
          el &&
          !el.classList.contains("talk-bubble") &&
          !el.classList.contains("help")
        ) {
          el = el.parentElement;
        }
        if (!el) {
          setTutorialStep(0);
        }
      }}
    >
      <HelpButton showTutorial={() => setTutorialStep(1)} />
      <EndButton />
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
      {showTutorial && tutorialStep === 1 ? (
        <TutorialOne
          onNext={() => setTutorialStep(2)}
          onClose={() => setTutorialStep(0)}
        />
      ) : showTutorial && tutorialStep === 2 ? (
        <TutorialTwo
          onNext={() => setTutorialStep(3)}
          onBack={() => setTutorialStep(1)}
          onClose={() => setTutorialStep(0)}
        />
      ) : showTutorial && tutorialStep === 3 ? (
        <TutorialThree
          onNext={() => setTutorialStep(4)}
          onBack={() => setTutorialStep(2)}
          onClose={() => setTutorialStep(0)}
        />
      ) : showTutorial && tutorialStep === 4 ? (
        <TutorialFour
          onNext={() => setTutorialStep(5)}
          onBack={() => setTutorialStep(3)}
          onClose={() => setTutorialStep(0)}
        />
      ) : showTutorial && tutorialStep === 5 ? (
        <TutorialFive
          onNext={() => setTutorialStep(6)}
          onClose={() => setTutorialStep(0)}
        />
      ) : null}
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
        <SoundMuteUn />
        <Lives lives={currentLives} />
        <Points points={currentPoints} />

      </div>

      { !showTutorial && isMobile ? (
          <JoyStickModule jump={jump} onWalk={setJoystickWalk} />
      ) : null }


      <ReactHowler
        src="/sounds/background.mp3"
        preload={true}
        loop={true}
        html5={true}
        playing={true}
        volume={0.07}
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
