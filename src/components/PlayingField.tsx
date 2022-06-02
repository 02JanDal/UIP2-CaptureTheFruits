import { FC, useEffect, useRef, useState } from "react";
import Platform from "./Platform";
import Character from "./Character";
import Fruit from "./Fruit";
import { playingField } from "../playingFieldDefinition";
import usePhysicsController, { PLAYER_HEIGHT } from "../hooks/usePhysicsController";
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
import ReactHowler from "react-howler";
import { HOWLER_VOLUME } from "../settings";
import JoyStickModule from "./JoyStickModule";

const PlayingField: FC = () => {
  const [currentPoints, setPoints] = useState(0);
  const [currentLives, setLives] = useState(3);

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
        setPlayerPos(playingField.playerStart);
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
  } = usePhysicsController(playingField, () => {
    // Bug: this doesnt work somehow
    console.log("fell off");
    setPlayerPos(playingField.playerStart);
  });


  useEffect(() => {
    if (currentLives <= 0) {
      gameOverSound.current = true;
    }
  }, [currentLives]);


  function setJoyStickWalk(d : number){
    console.log("joystickWalk  =>  " + d );
    if(d == -1){
      setJoystickWalk("left");
    } else if(d == 1){
      setJoystickWalk("right");
    } else {
      setJoystickWalk(null);
    }
  }
  const [walk, setwalk] = useState<null | "left" | "right">(null);
  const [joystickWalk, setJoystickWalk] = useState<null | "left" | "right">(null);
  const [facing, setFacing] = useState<"left" | "right">("right");
  const { keyboardWalk } = useKeyboardController(jump);

  useEffect(() => {
    setwalk( keyboardWalk );
  }, [keyboardWalk]);
  useEffect(() => {
    setwalk( joystickWalk );
  }, [joystickWalk]);


  useAnimationFrame((delta) => {
    const PIXEL_PER_MS = 1 / 8;
    if ( walk === "left" && canGoLeft) {
      setPlayerPos((p) => ({ y: p.y, x: p.x - PIXEL_PER_MS * delta }));
      setFacing( walk );
    } else if (walk === "right" && canGoRight) {
      setPlayerPos((p) => ({ y: p.y, x: p.x + PIXEL_PER_MS * delta }));
      setFacing(walk);
    }
  });


  const { fruits, setTouchedFruits } = useFruitController(
    playingField.fruits,
    playerPos,
    (points) => {
      setPoints(currentPoints + points);
      console.log(currentPoints);
      /*
      Playing sound on point Up / Down
      */
      pointUpSound.current = points > 0 ? true : false

      if (currentPoints + points < 0 && points === -5) {
        setLives(currentLives - 1);
      }
      console.log(`Touched fruit worth ${points} points`);
    }
  );

  // Player falling gets reset, works here falling works here!!
  let pos = { ...playerPos };
  if (pos.y + PLAYER_HEIGHT < 0) {
    setPlayerPos(playingField.playerStart);
    setLives(currentLives - 1);
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
      /*onDoubleClick={() => setPlayerVerticalVelocity(300)}
      onClick={(e) =>
        setPlayerPos({
          x: e.clientX,
          y: (e.target as HTMLDivElement).clientHeight - e.clientY,
        })
      }*/
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
      ></Character>
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

      <JoyStickModule  jump={jump} onWalk={setJoyStickWalk}/>

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
