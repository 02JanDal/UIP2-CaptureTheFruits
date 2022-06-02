import { FC, useEffect, useRef, useState } from "react";
import { Joystick, JoystickShape } from "react-joystick-component";
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";

const JoyStickModule: FC<{ jump: () => void; onWalk: (d: number) => void }> = (
  props
) => {

  const joyStickMoveMargin = useRef(8);
  const [jumpPressed, setJumpPressed] = useState(false);

  const changeJoyStick = function (event: IJoystickUpdateEvent) {
    if (event.type == "move") {
      /* Left */
      if (event.x !== null && event.x <= joyStickMoveMargin.current * -1) {
        props.onWalk(-1);
      }

      /* Right */
      if (event.x !== null && event.x >= joyStickMoveMargin.current) {
        props.onWalk(1);
      }

      /* Jump */
      if (
        !jumpPressed &&
        event.y !== null &&
        event.y >= joyStickMoveMargin.current
      ) {
        setJumpPressed(true);
        props.jump();
        setTimeout(() => {
          setJumpPressed(false);
        }, 1000); // making delay to keyup as after jump complete
      }
    } else if (event.type == "stop") {
      props.onWalk(0);
    } /* else if(event.type == "start"){
    }*/
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 200,
        left: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
      className="playing-field-info"
    >
      <Joystick
        size={80}
        minDistance={50}
        baseShape={JoystickShape.Square}
        stickShape={JoystickShape.Square}
        throttle={250}
        baseColor={"#ca9b33"}
        stickColor={"#23af16"}
        move={changeJoyStick}
        start={changeJoyStick}
        stop={changeJoyStick}
      ></Joystick>
    </div>
  );
};
export default JoyStickModule;
