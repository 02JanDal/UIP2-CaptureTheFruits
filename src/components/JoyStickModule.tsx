import { FC, useRef, useState } from "react";
import { Joystick } from "react-joystick-component";
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";

const JoyStickModule: FC<{
  jump: () => void;
  onWalk: (d: "left" | "right" | null) => void;
}> = (props) => {
  /*Size of JoyStick*/
  const joyStickSize = useRef(80);
  /*JoyStick margin from center, where idle state consider*/
  const joyStickMoveMargin = useRef(10);

  /*
  * Keep record of joystick last move if current direction of joystick also same then don't need to change direction.
  * */
  const joyStickLastMove = useRef("");

  /*
  * If jump is called then we need to give gap until jump is complete. so to manage the wait we use jumpPressed State
  * */
  const [jumpPressed, setJumpPressed] = useState(false);

  const changeJoyStick = function (event: IJoystickUpdateEvent) {
    if (event.type === "move") {
      /*
      * Idle checking with respect to joyStickMargin from center to clear previous move.
      * */
      if (
        joyStickLastMove.current !== "" &&
        event.x !== null &&
        event.x > -1 * joyStickMoveMargin.current &&
        event.x < joyStickMoveMargin.current &&
        event.y !== null &&
        event.y > -1 * joyStickMoveMargin.current &&
        event.y < joyStickMoveMargin.current
      ) {
        /* Idle */
        props.onWalk(null);
        joyStickLastMove.current = "";
      } else {
        /*
        * Left Right direction and jumping checking when values exceed from the joyStickMargin */
        if (
          /* Left */
          event.x !== null &&
          event.x <= joyStickMoveMargin.current * -1 &&
          event.x >= -1 * (joyStickSize.current / 2)
        ) {
          joyStickLastMove.current = "left";
          props.onWalk("left");
        }
        if (
          /* Right */
          event.x !== null &&
          event.x >= joyStickMoveMargin.current &&
          event.x <= joyStickSize.current / 2
        ) {
          joyStickLastMove.current = "right";
          props.onWalk("right");
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
          /*
          * calling Jump function which get in constructor
          * */
          props.jump();
          setTimeout(() => {
            /*
            * Reset jump state after a sec.
            * */
            setJumpPressed(false);
          }, 1000); // making delay to keyup as after jump complete
        }
      } // End else
    } else if (event.type === "stop") {
      props.onWalk(null);
      joyStickLastMove.current = "";
    }
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
        baseColor="#ca9b33"
        stickColor="#23af16"
        throttle={250} //The throttling rate of the move callback
        move={changeJoyStick}
        start={changeJoyStick}
        stop={changeJoyStick}
      ></Joystick>
    </div>
  );
};
export default JoyStickModule;
