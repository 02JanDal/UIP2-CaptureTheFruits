import {FC, useEffect, useState} from "react";
import imageScore from "../images/lives-points.png";
import {translate, useTranslate} from "react-polyglot";


/**
 * The background for our playing field. A blue sky, maybe some clouds (possibly animated) etc.
 */
const TutorialThree: FC<{
    onNext: () => void,
    onBack: () => void,
    onClose: () => void,
}> = (props) => {
    const translate = useTranslate()
    const {onNext, onBack, onClose} = props

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);

    {/* Performs similarly to componentDidMount in classes */}
    useEffect(() => {
        window.addEventListener("resize", () => {
            const ismobile = window.innerWidth <= 425;
            if (ismobile !== isMobile) setIsMobile(ismobile);
        }, false);
    }, [isMobile]);

    return (
        <div className={`bubble-three talk-bubble tri-right round ${isMobile ? "btm-left" : "right-top"}`}>
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
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        alignContent: "center",
                    }}>
                        <div style={{
                            width: "50%",
                        }}>
                            {translate("tutorialThree.title")}
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
                        {translate("tutorialThree.desc")}
                    </div>
                    <div style={{
                        marginTop: 20,
                    }}>
                        <button className="next-buttons left" onClick={onBack}>
                            {translate("tutorialThree.back")}
                        </button>
                        <button onClick={onNext}className="next-buttons">
                            {translate("tutorialThree.next")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
);
};
export default TutorialThree;
