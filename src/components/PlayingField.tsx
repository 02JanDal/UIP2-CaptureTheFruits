import { FC, useEffect, useRef, useState } from "react";
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

  // Setting the initial tutorial step number to 1
  const [tutorialStep, setTutorialStep] = useState(1);

  // Setting initial boolean to be false for when the user intersects
  // with the fruits that are 'poisonous'
  const pointDownSound = useRef(false);

  // Setting initial boolean to be false when the user intersects
  // with the fruits that 'edible'
  const pointUpSound = useRef(false);

  // Setting the initial boolean of mobile screen size to be false
  const [isMobile, setIsMobile] =
      useState(false);

  // The handleResize function that if the window is the mobile size,
  // then we are setting the isMobile boolean to be true, else false
  const handleResize = () => {
    if (window.innerWidth <= 425) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // Create an event listener that listens to the resize of the screen
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  // Using the UsePhysicsController function to define the player's
  // position; the player's position setter; the jump function; the boolean
  // onGround, canGoLeft, canGoRight, and atExit.
  // In here, we also set the onFellOff function to be passed on to the
  // usePhysicsController, in which when the user fell off the
  // valley/cliff, the player's initial position will be reset to its initial
  // position, and it will navigate to the "game lost" page
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

  // This is the onUseObject function that will be executed
  // when the user intersects with the exit door,
  // indicating that they have finished the game.
  // When they are at the exit door, then the function will
  // execute the onFinished function, which is to route
  // back to the home or landing page.
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

  // Setting the joystick controller walk direction for mobile (left or right)
  const [joystickWalk, setJoystickWalk] = useState<null | "left" | "right">(
    null
  );

  // Setting the keyboard controller walk direction for desktop (left or right)
  const { keyboardWalk } = useKeyboardController(jump, onUseObject);

  // Setting the walk variable to be either from the keyboard controller
  // or from the joystick controller
  const walk = keyboardWalk || joystickWalk;

  // Setting the constants of whether the user is facing to the left or to the right
  const [facing, setFacing] = useState<"left" | "right">("right");

  // The useAnimationFrame function is executed here which is to
  // animate the player's walk and update the player's position when they walk
  // and whether they can go to the left or right (reach the end of the screen)
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

  // Using the useGameController hooks to get the looseLife, currentPoints, currentLives,
  // and setPoints variable. The looseLife function is to decrease the live when the point
  // gets to negative. In this function, we also define the onLost function which is to
  // navigate to the lose game page when the user lost the game
  const { looseLife, currentPoints, currentLives, setPoints } =
    useGameController(field, setPlayerPos, () => {
      navigate("/lose-game");
    });

  // Initializing useNavigate() to navigate/route to different pages
  const navigate = useNavigate();

  // Using the useFruitController hook to get the data of the current fruits
  // that haven't been eaten by the player that need to be displayed.
  // It defines the onFruitTouched function which will set the number of points
  // collected by the player.
  const { fruits } = useFruitController(field.fruits, playerPos, (points) => {
    setPoints(currentPoints + points);
    // Playing sound on when the user gets or loses point
    pointUpSound.current = points > 0;
    pointDownSound.current = points < 0;
  });

  // Define the flowers, ladders, trees, and platforms data from the field
  const { flowers, ladders, trees, platforms } = field;

  // Define the scrollOffSet variable using the useScrollController
  // to display the offset that the playing field should be scrolled by
  // and automatically scroll through the page if the user has reached
  // the end of their screen size
  const scrollOffset = useScrollController({
    fieldWidth: field.width,
    playerPos,
  });

  // Display the playing field
  return (
      // Close the modal of the tutorial
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
      {/* The help button to show the tutorial */}
      <HelpButton showTutorial={() => setTutorialStep(1)} />

      {/* The end button to exit the game  */}
      <EndButton />

      {/* Displaying the platforms */}
      {platforms.map((p, i) => (
        <Platform key={i} x={p.x} y={p.y} width={p.width} height={p.height} />
      ))}

      {/* Displaying the flowers */}
      {flowers.map((f, i) => (
        <Flowers key={i} x={f.x} y={f.y} />
      ))}

      {/* Displaying the ladders */}
      {ladders.map((f, i) => (
        <Ladder key={i} x={f.x} y={f.y} width={f.width} height={f.height} />
      ))}

      {/* Displaying the trees */}
      {trees.map((f, i) => (
        <Tree key={i} x={f.x} y={f.y} image={f.image} />
      ))}

      {/* Displaying the fruits */}
      {fruits.map((f, i) => (
        <Fruit key={i} x={f.x} y={f.y} points={f.points} />
      ))}

      {/* Displaying the exit door to "end" the game that the player has completed */}
      <ExitDoor x={field.exit.x} y={field.exit.y} />

      {/* Displaying the character.
       We first set that the player is falling off from the sky, so it's not onGround.
       Then we set that if the player is walking to the left direction, it can go to the left
       and if the player is walking to the right direction, it can go to the right*/}
      <Character
        x={playerPos.x}
        y={playerPos.y}
        jumping={!onGround}
        walking={
          (walk === "left" && canGoLeft) || (walk === "right" && canGoRight)
        }
        facing={facing}
      />

      {/* Showing the tutorial pages for different pages specified */}
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

      {/* Showing the sound toggle, lives and points display */}
      <div
        style={{
          // By using position fixed this div will be placed at the same place on
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
        {/* Sound toggle */}
        <SoundMuteUn />

        {/* Lives and points display */}
        <Lives lives={currentLives} />
        <Points points={currentPoints} />
      </div>

      {/* Display the joystick on mobile */}
      {!showTutorial && isMobile ? (
        <JoyStickModule jump={jump} onWalk={setJoystickWalk} />
      ) : null}

      {/* Play the background sound */}
      <ReactHowler
        src="sounds/background.mp3"
        preload={true}
        loop={true}
        html5={true}
        playing={true}
        volume={0.07}
      />

      {/* Play the sound effect when the user eats poisonous food */}
      <ReactHowler
        src="sounds/pointDown.wav"
        preload={true}
        html5={true}
        loop={false}
        playing={pointDownSound.current}
        volume={HOWLER_VOLUME}
        onEnd={() => {
          pointDownSound.current = false;
        }}
      />

      {/* Play the sound effect when the user eats edible food */}
      <ReactHowler
        src="sounds/pointUp.wav"
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
