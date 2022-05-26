import { FC } from "react";
import { Link } from "react-router-dom";
import playingFields from "../data/playingFields";
import { useTranslate } from "react-polyglot";

const HomePage: FC = () => {
  const translate = useTranslate();

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
        {playingFields.map((_, index) => (
          <Link to={`/play/${index}`} key={index}>
            <button>{translate("menu.play", { index: index + 1 })}</button>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default HomePage;
