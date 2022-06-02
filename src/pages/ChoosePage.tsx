import { FC } from "react";
import { Link } from "react-router-dom";
import playingFields from "../data/playingFields";
import { useTranslate } from "react-polyglot";

const HomePage: FC = () => {
  const translate = useTranslate();

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
                          {playingFields.map((_, index) => (
                              <Link to={`/play/${index}`} key={index}>
                                  <button className="next-buttons home-buttons">{translate("menu.play", { index: index + 1 })}</button>
                              </Link>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      </div>

  );
};
export default HomePage;
