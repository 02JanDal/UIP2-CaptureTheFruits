import { FC } from "react";
import imageArrows from "../images/KeyboardArrows.png";
import imageSpacebar from "../images/KeyboardSpacebar.jpeg";
import imageStand from "../images/char-stand.png";
import imageChar from "../images/char-tutorial.png";

/**
 * The background for our playing field. A blue sky, maybe some clouds (possibly animated) etc.
 */
const TutorialFive: FC = () => {
    return (
        <div className="talk-bubble tri-right round btm-left" style={{
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
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                }}>
                    <div>
                        <img src={imageChar} style={{
                            width:70,
                        }}/>
                    </div>
                    <div style={{
                        marginLeft:20,
                    }}>
                        <div>
                            <div
                                style={{
                                    fontSize: 25,
                                    marginLeft:10,
                                    marginBottom: 20,
                                }}>
                                Ready to win?
                            </div>
                            <div>
                                <button>Play now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TutorialFive;
