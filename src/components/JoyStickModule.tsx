import { FC, useEffect, useRef, useState } from "react";
import { Joystick, JoystickShape } from "react-joystick-component";
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";

const JoyStickModule: FC<{ jump: () => void; onwalk: (d: string) => void }> = (
  props
) => {
  const joyStickSize = useRef(80);
  const joyStickMoveMargin = useRef(16);
  const joyStickLastMove = useRef("");
  const [jumpPressed, setJumpPressed] = useState(false);


  /*Testing*/
    /*useEffect(() => {
        console.log("joyStrickMove => " + joyStickLastMove.current );
    }, [joyStickLastMove.current]);
*/

    const changeJoyStick = function (event: IJoystickUpdateEvent) {
    if (event.type == "move") {
        //console.log("move x => " + event.x + " y => "+ event.y);
      if (
        joyStickLastMove.current != "" &&
        event.x !== null &&
        event.x > -1 * joyStickMoveMargin.current &&
        event.x < joyStickMoveMargin.current &&
        event.y !== null &&
        event.y > -1 * joyStickMoveMargin.current &&
        event.y < joyStickMoveMargin.current
      ) {
          /* Idle */
        props.onwalk("");
        joyStickLastMove.current = "";
      } else {
          if (
              /* Left */
              event.x !== null &&
              event.x <= joyStickMoveMargin.current * -1 &&
              event.x >= -1 * (joyStickSize.current / 2)
          ) {
              joyStickLastMove.current = "left";
              props.onwalk("left");
          }
          if (
              /* Right */
              event.x !== null &&
              event.x >= joyStickMoveMargin.current &&
              event.x <= joyStickSize.current / 2
          ) {
              joyStickLastMove.current = "right";
              props.onwalk("right");
          }
          if (
              /* Jump */
              !jumpPressed &&
              event.y !== null &&
              event.y >= joyStickMoveMargin.current &&
              event.y <= joyStickSize.current / 2
          ) {
              joyStickLastMove.current = "jump";
              setJumpPressed(true);
              props.jump();
              setTimeout(() => {
                  setJumpPressed(false);
              }, 1000); // making delay to keyup as after jump complete
          }

      } // End else

    } else if (event.type == "stop") {
      props.onwalk("");
      joyStickLastMove.current = "";
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
        size={joyStickSize.current}
        baseShape={JoystickShape.Square}
        stickShape={JoystickShape.Square}
        baseColor={"#ca9b33"}
        stickColor={"#23af16"}
        throttle={250}
        move={changeJoyStick}
        start={changeJoyStick}
        stop={changeJoyStick}
      ></Joystick>
    </div>
  );
};
export default JoyStickModule;
