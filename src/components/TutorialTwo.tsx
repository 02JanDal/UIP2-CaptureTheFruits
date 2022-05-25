import { FC } from "react";
import imageChar from "../images/char-tutorial.png";
import imageFruit1 from "../images/fruit-1.png";
import imageFruit2 from "../images/fruit-2.png";
import imageFruit3 from "../images/fruit-3.png";


/**
 * The background for our playing field. A blue sky, maybe some clouds (possibly animated) etc.
 */
const TutorialTwo: FC = () => {
    return (
        <div className="talk-bubble tri-right round btm-left-in" style={{
            left: 550,
            bottom: 180,
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
                    Collect as many points as possible!
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                }}>
                    <div>
                        <img src={imageFruit1} style={{
                            width:50,
                        }}/>
                    </div>
                    <div style={{paddingRight: 10}}>
                        = 5 points
                    </div>
                    <div>
                        <img src={imageFruit2} style={{
                            width:50,
                        }}/>
                    </div>
                    <div style={{paddingRight: 10}}>
                        = 10 points
                    </div>
                    <div>
                        <img src={imageFruit3} style={{
                            width:50,
                        }}/>
                    </div>
                    <div style={{paddingRight: 10}}>
                        = -5 points
                    </div>
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
export default TutorialTwo;
