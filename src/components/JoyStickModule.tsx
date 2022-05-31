import { FC,  useEffect, useRef } from "react";
import { Joystick, JoystickShape } from "react-joystick-component";
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";
import { playingField } from "../playingFieldDefinition";

const JoyStickModule: FC = (props) => {

  const joyStickMoveMargin = useRef(8);


  const jumpPressed = useRef(false);
  const rightPressed = useRef(false);
  const leftPressed = useRef(false);

  /*
  * Testing
  * */
  useEffect(() => {
    console.log("jumpPressed " + jumpPressed.current)
  }, [jumpPressed.current]);
  useEffect(() => {
    console.log("rightPressed " + rightPressed.current)
  }, [rightPressed.current]);
  useEffect(() => {
    console.log("leftPressed " + leftPressed.current)
  }, [leftPressed.current]);

  const keyUpLeft = function(){
    if (leftPressed.current) {
      leftPressed.current = false;
      window.dispatchEvent(new KeyboardEvent('keyup', {
        key: "ArrowLeft", keyCode: 37, code: "ArrowLeft", which: 37,
        shiftKey: false, ctrlKey: false, metaKey: false
      }));
    }
  }

  const keyUpRight = function(){
    if (rightPressed.current) {
      rightPressed.current = false;
      window.dispatchEvent(new KeyboardEvent('keyup', {
        key: "ArrowRight", keyCode: 39, code: "ArrowRight", which: 39,
        shiftKey: false, ctrlKey: false, metaKey: false
      }));
    }
  }

  const doJump = () => {
    if(!jumpPressed.current){
      jumpPressed.current = true;
      window.dispatchEvent(new KeyboardEvent('keydown', {
        key: "ArrowUp", keyCode: 38, code: "ArrowUp", which: 38,
        shiftKey: false, ctrlKey: false, metaKey: false
      }));
      setTimeout(() => {
        jumpPressed.current = false;
        window.dispatchEvent(new KeyboardEvent('keyup', {
          key: "ArrowUp", keyCode: 38, code: "ArrowUp", which: 38,
          shiftKey: false, ctrlKey: false, metaKey: false
        }));
      }, 1000); // making delay to keyup as after jump complete
    }
  }

  const changeJoyStick = function (event: IJoystickUpdateEvent) {

    if(event.type == "move") {
      /*
      * Left
      * */
      if( !leftPressed.current && event.x !== null && event.x <= (joyStickMoveMargin.current * -1) ){
        if(rightPressed.current) keyUpRight();
        window.dispatchEvent(new KeyboardEvent('keydown', {
          key: "ArrowLeft", keyCode: 37, code: "ArrowLeft", which: 37,
          shiftKey: false, ctrlKey: false, metaKey: false
        }));
        window.dispatchEvent(new KeyboardEvent('keypress', {
          key: "ArrowLeft", keyCode: 37, code: "ArrowLeft", which: 37,
          shiftKey: false, ctrlKey: false, metaKey: false
        }));
        leftPressed.current = true;
      }

      /*
      * Right
      * */
      if( !rightPressed.current && event.x !== null && event.x >= joyStickMoveMargin.current){
        if(leftPressed.current) keyUpLeft();
        window.dispatchEvent(new KeyboardEvent('keydown', {
          key: "ArrowRight", keyCode: 39, code: "ArrowRight", which: 39,
          shiftKey: false, ctrlKey: false, metaKey: false
        }));
        window.dispatchEvent(new KeyboardEvent('keypress', {
          key: "ArrowRight", keyCode: 39, code: "ArrowRight", which: 39,
          shiftKey: false, ctrlKey: false, metaKey: false
        }));
        rightPressed.current = true;
      }

      /*
      * jump move
      * */
      if(event.y !== null && event.y >= joyStickMoveMargin.current)
        doJump();

    } else if(event.type == "start"){
      jumpPressed.current = false;
      rightPressed.current = false;
      leftPressed.current = false;
    } else if(event.type == "stop"){
      keyUpLeft();
      keyUpRight();
    }
  };



  return (
    <div
      style={{
        // by using position fixed this div will be placed at the same place on
        // the screen, regardless of the offset of the rest of the playing field
        position: "fixed",
        top: 200,
        left: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
      className="playing-field-info"
    >
      <Joystick size={80}
                minDistance={50}
                baseShape={JoystickShape.Square}
                throttle={250}
                move={changeJoyStick}
                start={changeJoyStick}
                stop={changeJoyStick}
      ></Joystick>

    </div>
  );
};
export default JoyStickModule;
