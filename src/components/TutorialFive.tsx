import { FC } from "react";
import imageChar from "../images/char-tutorial.png";
import { useTranslate } from "react-polyglot";

/**
 * File: TutorialFive.tsx
 *
 * This file contains the fifth tutorial page of the game
 * to help user understands the game and how to play it.
 *
 * @param props The onNext function to move to the next page of the tutorial, The onClose function to close the tutorial page
 * @constructor The TutorialFive file
 */
const TutorialFive: FC<{
  onNext: () => void;
  onClose: () => void;
}> = (props) => {
  // The onNext and onClose function to move to next page of the tutorial and to
  // close the tutorial page respectively
  const { onNext, onClose } = props;

  // Using the useTranslate() constructor to access the strings that
  // are written in the dictionary
  const translate = useTranslate();

  return (
    // The chat bubble of the fifth tutorial page that points to the player character
    <div className="talk-bubble tri-right round btm-left bubble-five">
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

        {/* The content of the tutorial page five */}
        <div style={{ padding: 15 }}>
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
                src={imageChar}
                style={{
                  width: 70,
                }}
                alt=""
              />
            </div>
            <div
              style={{
                marginLeft: 20,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 25,
                    marginLeft: 10,
                    marginBottom: 20,
                  }}
                >
                  {translate("tutorialFive.title")}
                </div>

                {/* The play button to start playing the game */}
                <div>
                  <button onClick={onNext} className="next-buttons">
                    {translate("tutorialFive.play")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// Exporting tutorial five page to be displayed in the playing field
export default TutorialFive;
