import { FC } from "react";
import imageScore from "../images/lives-points.png";


/**
 * The background for our playing field. A blue sky, maybe some clouds (possibly animated) etc.
 */
const TutorialThree: FC = () => {
    return (
        <div className="talk-bubble tri-right round right-top" style={{
            top: 5,
            right: 580,
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
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    alignContent: "center",
                }}>
                    <div style={{
                        width: "50%",
                    }}>
                        Each player gets 3 lives
                    </div>
                    <div>
                        <img src={imageScore} style={{
                            width:80,
                        }}/>
                    </div>
                </div>
                <div style={{
                    marginTop: 20,
                }}>
                    When points get negative, player will lose a life
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
export default TutorialThree;
