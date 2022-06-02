import { FC } from "react";
import imageArrows from "../images/KeyboardArrows.png";
import imageSpacebar from "../images/KeyboardSpacebar.jpeg";
import imageStand from "../images/char-stand.png";
import imageChar from "../images/char-tutorial.png";
import {useTranslate} from "react-polyglot";

/**
 * The background for our playing field. A blue sky, maybe some clouds (possibly animated) etc.
 */
const TutorialFive: FC<{
    onNext: () => void,
    onClose: () => void,
}> = (props) => {
    const {onNext, onClose} = (props)
    const translate = useTranslate()

    return (
        <div className="talk-bubble tri-right round btm-left bubble-five">
            <div
                style={{
                    backgroundColor: "white",
                    margin: "0 auto",
                    textAlign: "center",
                    borderRadius: 25,
                    padding: 15,
                }}>
                <span style={{font: "initial", display: "flex", fontSize: 24}} onClick={onClose}>×</span>
                <div style={{padding: 15}}>
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
                                    {translate("tutorialFive.title")}
                                </div>
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
export default TutorialFive;
