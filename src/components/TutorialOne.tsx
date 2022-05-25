import { FC } from "react";
import imageArrows from "../images/KeyboardArrows.png";
import imageSpacebar from "../images/KeyboardSpacebar.jpeg";
import imageStand from "../images/char-stand.png";
import imageChar from "../images/char-tutorial.png";

/**
 * The background for our playing field. A blue sky, maybe some clouds (possibly animated) etc.
 */
const TutorialOne: FC = () => {
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
                    fontSize: 25,
                    paddingBottom: 20,
                }}>
                    How to move the character
                </div>
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
                        <div
                            style={{
                                display:"flex",
                                justifyContent: "center",
                                alignItems:"center",
                                alignContent:"center",
                                marginBottom: 15,
                            }}>
                            <div>
                                <img src={imageArrows}
                                     style={{width:80}}/>
                            </div>
                            <div
                                style={{
                                    fontSize: 18,
                                    marginLeft:10,
                                }}>
                                Move up, down, left, and right
                            </div>
                        </div>
                        <div
                            style={{
                                display:"flex",
                                justifyContent: "space-evenly",
                                alignItems:"center",
                                alignContent:"center",
                            }}>
                            <div>
                                <img src={imageSpacebar}
                                     style={{width:80}}/>
                            </div>
                            <div style={{
                                fontSize: 18,
                                marginLeft: 10,
                            }}>
                                Jump!
                            </div>
                        </div>
                    </div>

                </div>
                <div style={{
                    marginTop: 20,
                }}>
                    <button>Next</button>
                </div>

            </div>
        </div>
    );
};
export default TutorialOne;
