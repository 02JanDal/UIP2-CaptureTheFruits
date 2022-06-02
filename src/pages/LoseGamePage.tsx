import React, { FC, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslate } from "react-polyglot";

export const LoseGamePage: FC = () => {
    const translate = useTranslate();

    return (
        <div className="home-page-picture">
            <div className="home-page-layover">
                <div className="home-page-container end-page-container">
                    <div className="home-page-title" style={{ marginBottom: 20}}>
                        {translate("loseGame.title")}
                    </div>
                    <div style={{fontSize: 20, fontFamily: 'sans-serif'}}>
                        {translate("loseGame.playAgain")}
                    </div>
                    <div
                        style={{
                            textAlign: "center",
                        }}
                    >
                        <Link to="/">
                            <button className="next-buttons endgame-buttons">{translate("afterGame.backToMenu")}</button>
                        </Link>
                        <Link to="/play">
                            <button className="next-buttons endgame-buttons">{translate("loseGame.playButton")}</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
