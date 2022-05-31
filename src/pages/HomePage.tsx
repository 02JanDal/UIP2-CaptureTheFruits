import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslate } from "react-polyglot";
import { LocaleContext } from "../i18n";

const HomePage: FC = () => {
  const translate = useTranslate();
  const { setLocale } = useContext(LocaleContext)!;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        top: "40%",
        position: "relative",
      }}
    >
      <div
        style={{
          fontSize: 100,
          height: "100%",
          width: "100%",
          textAlign: "center",
        }}
      >
        {translate("title")}
      </div>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <Link to="/play">
          <button>{translate("menu.playNow")}</button>
        </Link>
        <Link to="/tutorial">
          <button>{translate("menu.tutorial")}</button>
        </Link>
        <Link to="/leaderboard">
          <button>{translate("leaderboard.title")}</button>
        </Link>
        <button onClick={() => setLocale("en")}>
          {translate("menu.setEnglish")}
        </button>
        <button onClick={() => setLocale("sv")}>
          {translate("menu.setSwedish")}
        </button>
      </div>
    </div>
  );
};
export default HomePage;
