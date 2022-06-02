import { FC } from "react";
import imageArrows from "../images/KeyboardArrows.png";
import imageSpacebar from "../images/KeyboardSpacebar.jpeg";
import imageStand from "../images/char-stand.png";
import imageChar from "../images/char-tutorial.png";
import { useTranslate } from "react-polyglot";

/**
 * The background for our playing field. A blue sky, maybe some clouds (possibly animated) etc.
 */
const TutorialOne: FC<{
    onNext: () => void,
    onClose: () => void,
}> = (props) => {
    const translate = useTranslate();
    const {onNext, onClose} = props
    return (
        <div className="talk-bubble tri-right round btm-left bubble-one">
            <div
                style={{
                    backgroundColor: "white",
                    margin: "0 auto",
                    textAlign: "center",
                    borderRadius: 25,
                    padding: 15,
                }}>
                <span style={{font: "initial", display: "flex", fontSize: 24}} onClick={onClose}>×</span>
                <div style={{padding:15}}>
                    <div style={{
                        fontSize: 25,
                        paddingBottom: 20,
                    }}>
                        {translate("tutorialOne.title")}
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
                                    {translate("tutorialOne.desc1")}
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
                                    {translate("tutorialOne.desc2")}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div style={{
                        marginTop: 20,
                    }}>
                        <button
                        onClick={onNext} className="next-buttons">
                            {translate("tutorialOne.next")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TutorialOne;
