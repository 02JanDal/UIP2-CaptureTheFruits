import { FC } from "react";
import imageArrows from "../images/KeyboardArrows.png";
import imageSpacebar from "../images/KeyboardSpacebar.jpeg";

import imageChar from "../images/char-tutorial.png";
import { useTranslate } from "react-polyglot";

/**
 * File: TutorialOne.tsx
 *
 * This file contains the first tutorial page of the game
 * to help the user understands the game and how to play it.
 *
 * @param props The onNext function to move to the next page of the tutorial, The onClose function to close the tutorial page
 * @constructor The TutorialOne file
 */
const TutorialOne: FC<{
  onNext: () => void;
  onClose: () => void;
}> = (props) => {
  // Using the useTranslate() constructor to access the strings that
  // are written in the dictionary
  const translate = useTranslate();

  // The onNext and onClose function to move to next page of the tutorial and to
  // close the tutorial page respectively
  const { onNext, onClose } = props;
  return (
    // The chat bubble of the first tutorial page that points to the player character
    <div className="talk-bubble tri-right round btm-left bubble-one">
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

        {/* The content of the first tutorial page */}
        <div style={{ padding: 15 }}>
          <div
            style={{
              fontSize: 25,
              paddingBottom: 20,
            }}
          >
            {translate("tutorialOne.title")}
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  marginBottom: 15,
                }}
              >
                <div>
                  <img src={imageArrows} style={{ width: 80 }} alt="" />
                </div>
                <div
                  style={{
                    fontSize: 18,
                    marginLeft: 10,
                  }}
                >
                  {translate("tutorialOne.desc1")}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <div>
                  <img src={imageSpacebar} style={{ width: 80 }} alt="" />
                </div>
                <div
                  style={{
                    fontSize: 18,
                    marginLeft: 10,
                  }}
                >
                  {translate("tutorialOne.desc2")}
                </div>
              </div>
            </div>
          </div>

          {/* The next button to go to the next page */}
          <div
            style={{
              marginTop: 20,
            }}
          >
            <button onClick={onNext} className="next-buttons">
              {translate("tutorialOne.next")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
// Exporting tutorial one page to be displayed in the playing field
export default TutorialOne;
