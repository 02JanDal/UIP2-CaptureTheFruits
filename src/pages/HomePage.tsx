import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslate } from "react-polyglot";
import { LocaleContext } from "../i18n";

const HomePage: FC = () => {
  const translate = useTranslate();
  const { setLocale } = useContext(LocaleContext)!;

  return (
      <div className="home-page-picture">
          <div className="home-page-layover">
            <div
                className="home-page-container"
            >
              <div
                  className="home-page-title"
              >
                {translate("title")}
              </div>
              <div
                style={{
                  textAlign: "center",
                }}
              >
                  <div className="home-page-buttons">
                      <Link to="/play">
                          <button className="next-buttons home-buttons">{translate("menu.playNow")}</button>
                      </Link>
                      <Link to="/tutorial">
                          <button className="next-buttons home-buttons">{translate("menu.tutorial")}</button>
                      </Link>
                      <Link to="/leaderboard">
                          <button className="next-buttons home-buttons">{translate("leaderboard.title")}</button>
                      </Link>
                  </div>
                <button className="next-buttons home-buttons" onClick={() => setLocale("en")}>
                  {translate("menu.setEnglish")}
                </button>
                <button className="next-buttons home-buttons" onClick={() => setLocale("sv")}>
                  {translate("menu.setSwedish")}
                </button>
              </div>
            </div>
          </div>
      </div>
  );
};
export default HomePage;