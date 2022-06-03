import { FC, useEffect, useState } from "react";
import imageScore from "../images/lives-points.png";
import { useTranslate } from "react-polyglot";

/**
 * File: TutorialThree.tsx
 *
 * This file contains the fourth tutorial page of the game
 * to help the user understands the game and how to play it.
 *
 * @param props The onNext function to move to the next page of the tutorial, The onClose function to close the tutorial page,
 * and The onBack function to move to the previous page of the tutorial.
 * @constructor The TutorialThree file
 */
const TutorialThree: FC<{
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
}> = (props) => {
  // Using the useTranslate() constructor to access the strings that
  // are written in the dictionary
  const translate = useTranslate();

  // The onNext, onBack, and onClose function to move to next page of the tutorial,
  // to move to the previous page of the tutorial, and to close the tutorial page
  // respectively
  const { onNext, onBack, onClose } = props;

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
    // The chat bubble of the third tutorial page
    // If the screen size is desktop, then the chat bubble will point to the lives and points viewer
    // If the screen size is mobile, then the chat bubble will point to the player character
    <div
      className={`bubble-three talk-bubble tri-right round ${
        isMobile ? "btm-left" : "right-top"
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

        {/* The content of the third tutorial page */}
        <div style={{ padding: 15 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <div
              style={{
                width: "50%",
              }}
            >
              {translate("tutorialThree.title")}
            </div>
            <div>
              <img
                src={imageScore}
                style={{
                  width: 80,
                }}
                alt=""
              />
            </div>
          </div>
          <div
            style={{
              marginTop: 20,
            }}
          >
            {translate("tutorialThree.desc")}
          </div>
          <div
            style={{
              marginTop: 20,
            }}
          >
            {/* The back button to go to the previous page */}
            <button className="next-buttons left" onClick={onBack}>
              {translate("tutorialThree.back")}
            </button>

            {/* The next button to go to the next page */}
            <button onClick={onNext} className="next-buttons">
              {translate("tutorialThree.next")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
// Exporting tutorial three page to be displayed in the playing field
export default TutorialThree;
