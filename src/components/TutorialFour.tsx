import {FC, useEffect, useState} from "react";
import imageCliff from "../images/cliff.png";
import imageSpacebar from "../images/KeyboardSpacebar.jpeg";
import {useTranslate} from "react-polyglot";


/**
 * The background for our playing field. A blue sky, maybe some clouds (possibly animated) etc.
 */
const TutorialFour: FC<{
    onNext: () => void,
    onBack: () => void,
    onClose: () => void,
}> = (props) => {
    const {onNext, onBack, onClose} = props
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);
    const translate = useTranslate()

    {/* Performs similarly to componentDidMount in classes */}
    useEffect(() => {
        window.addEventListener("resize", () => {
            const ismobile = window.innerWidth <= 425;
            if (ismobile !== isMobile) setIsMobile(ismobile);
        }, false);
    }, [isMobile]);

    return (
        <div className={`bubble-four talk-bubble tri-right round ${isMobile ? "btm-left" : "btm-left-in"}`}>
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
                        {translate("tutorialFour.title")}
                    </div>
                    <div>
                        <img src={imageCliff}
                             style={{width:220,
                             borderRadius: "10%",}}/>
                    </div>
                    <div style={{
                        marginTop: 20,
                    }}>
                        <button className="next-buttons left" onClick={onBack}>
                            {translate("tutorialFour.back")}
                        </button>
                        <button onClick={onNext} className="next-buttons">
                            {translate("tutorialFour.next")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
);
};
export default TutorialFour;
