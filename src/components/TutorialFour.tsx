import { FC } from "react";
import imageCliff from "../images/cliff.png";
import imageSpacebar from "../images/KeyboardSpacebar.jpeg";


/**
 * The background for our playing field. A blue sky, maybe some clouds (possibly animated) etc.
 */
const TutorialFour: FC = () => {
    return (
        <div className="talk-bubble tri-right round btm-left-in" style={{
            left: 40,
            bottom: 160,
        }}>
            <div
                style={{
                    backgroundColor: "lightyellow",
                    margin: "0 auto",
                    textAlign: "center",
                    borderRadius: 25,
                    padding: 30,
                }}>
                <div style={{
                    fontSize: 25,
                    paddingBottom: 20,
                }}>
                    If a player falls off the cliff, player will lose a life
                </div>
                <div>
                    <img src={imageCliff}
                         style={{width:220,
                         borderRadius: "10%",}}/>
                </div>
                <div style={{
                    marginTop: 20,
                }}>
                    <button>Back</button>
                    <button>Next</button>
                </div>

            </div>
        </div>
);
};
export default TutorialFour;
