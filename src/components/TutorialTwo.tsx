import {FC, useEffect, useState} from "react";
import imageChar from "../images/char-tutorial.png";
import imageFruit1 from "../images/fruit-1.png";
import imageFruit2 from "../images/fruit-2.png";
import imageFruit3 from "../images/fruit-3.png";
import {translate, useTranslate} from "react-polyglot";


/**
 * The background for our playing field. A blue sky, maybe some clouds (possibly animated) etc.
 */
const TutorialTwo: FC<{
    onNext: () => void,
    onBack: () => void,
    onClose: () => void,
}> = (props) => {
    const { onNext, onBack, onClose } = props

    const translate = useTranslate()

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);

    {/* Performs similarly to componentDidMount in classes */}
    useEffect(() => {
        window.addEventListener("resize", () => {
            const ismobile = window.innerWidth <= 425;
            if (ismobile !== isMobile) setIsMobile(ismobile);
        }, false);
    }, [isMobile]);

    return (
        <div className={`bubble-two talk-bubble tri-right round ${isMobile ? "btm-left" : "btm-left-in"}`}>
            <div
                style={{
                    backgroundColor: "lightyellow",
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
                        {translate("tutorialTwo.title")}
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
                            {translate("tutorialTwo.tomato")}
                        </div>
                        <div>
                            <img src={imageFruit2} style={{
                                width:50,
                            }}/>
                        </div>
                        <div style={{paddingRight: 10}}>
                            {translate("tutorialTwo.banana")}
                        </div>
                        <div>
                            <img src={imageFruit3} style={{
                                width:50,
                            }}/>
                        </div>
                        <div style={{paddingRight: 10}}>
                            {translate("tutorialTwo.eggplant")}
                        </div>
                    </div>
                    <div style={{
                        marginTop: 20,
                    }}>
                        <button className="next-buttons left" onClick={onBack}>
                            {translate("tutorialTwo.back")}
                        </button>
                        <button onClick={onNext}
                        className="next-buttons">
                            {translate("tutorialTwo.next")}
                        </button>
                    </div>
                </div>

            </div>
        </div>
);
};
export default TutorialTwo;
