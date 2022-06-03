import { FC, useEffect, useState } from "react";
import imageFruit1 from "../images/fruit-1.png";
import imageFruit2 from "../images/fruit-2.png";
import imageFruit3 from "../images/fruit-3.png";
import { useTranslate } from "react-polyglot";

/**
 * File: TutorialTwo.tsx
 *
 * This file contains the fourth tutorial page of the game
 * to help the user understands the game and how to play it.
 *
 * @param props The onNext function to move to the next page of the tutorial, The onClose function to close the tutorial page,
 * and The onBack function to move to the previous page of the tutorial.
 * @constructor The TutorialThree file
 */
const TutorialTwo: FC<{
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
}> = (props) => {
  // Using the useTranslate() constructor to access the strings that
  // are written in the dictionary
  const { onNext, onBack, onClose } = props;

  // The onNext, onBack, and onClose function to move to next page of the tutorial,
  // to move to the previous page of the tutorial, and to close the tutorial page
  // respectively
  const translate = useTranslate();

  // check if the screen is mobile or not
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);

  // If the screen is mobile, we resize certain elements to fit mobile devices
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        const ismobile = window.innerWidth <= 425;
        if (ismobile !== isMobile) setIsMobile(ismobile);
      },
      false
    );
  }, [isMobile]);

  return (
    // The chat bubble of the second tutorial page
    // If the screen size is desktop, then the chat bubble will point to the fruits
    // If the screen size is mobile, then the chat bubble will point to the player character
    <div
      className={`bubble-two talk-bubble tri-right round ${
        isMobile ? "btm-left" : "btm-left-in"
      }`}
    >
      <div
        style={{
          backgroundColor: "white",
          margin: "0 auto",
          textAlign: "center",
          borderRadius: 25,
          padding: 15,
        }}
      >
        {/* The close button */}
        <span
          style={{ font: "initial", display: "flex", fontSize: 24 }}
          onClick={onClose}
        >
          ×
        </span>

        {/* The content of the second tutorial page */}
        <div style={{ padding: 15 }}>
          <div
            style={{
              fontSize: 25,
              paddingBottom: 20,
            }}
          >
            {translate("tutorialTwo.title")}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <div>
              <img
                src={imageFruit1}
                style={{
                  width: 50,
                }}
                alt=""
              />
            </div>
            <div style={{ paddingRight: 10 }}>
              {translate("tutorialTwo.tomato")}
            </div>
            <div>
              <img
                src={imageFruit2}
                style={{
                  width: 50,
                }}
                alt=""
              />
            </div>
            <div style={{ paddingRight: 10 }}>
              {translate("tutorialTwo.banana")}
            </div>
            <div>
              <img
                src={imageFruit3}
                style={{
                  width: 50,
                }}
                alt=""
              />
            </div>
            <div style={{ paddingRight: 10 }}>
              {translate("tutorialTwo.eggplant")}
            </div>
          </div>
          <div
            style={{
              marginTop: 20,
            }}
          >
            {/* The back button to go to the previous page */}
            <button className="next-buttons left" onClick={onBack}>
              {translate("tutorialTwo.back")}
            </button>
            {/* The next button to go to the next page */}
            <button onClick={onNext} className="next-buttons">
              {translate("tutorialTwo.next")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
// Exporting tutorial two page to be displayed in the playing field
export default TutorialTwo;
