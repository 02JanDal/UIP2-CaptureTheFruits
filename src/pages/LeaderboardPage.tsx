import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useTranslate } from "react-polyglot";
import { useLeaderboard } from "../leaderboard";

const HomePage: FC = () => {
  const translate = useTranslate();
  const leaderboard = useLeaderboard();

  return (
      <div className="home-page-picture">
          <div className="home-page-layover">
              <div className="home-page-container">
                  <div className="home-page-title" style={{marginBottom:0}}>
                    {translate("leaderboard.title")}
                  </div>
                  <table className="styled-table">
                    <thead>
                      <tr>
                        <th>{translate("leaderboard.name")}</th>
                        <th>{translate("leaderboard.field")}</th>
                        <th>{translate("leaderboard.points")}</th>
                        <th>{translate("leaderboard.lives")}</th>
                        <th>{translate("leaderboard.date")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.field + 1}</td>
                          <td>{item.points}</td>
                          <td>{item.lives}</td>
                          <td>{item.date.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div
                      style={{
                          textAlign: "center",
                      }}
                  >
                      <Link to="/">
                          <button className="next-buttons endgame-buttons">{translate("afterGame.backToMenu")}</button>
                      </Link>
                  </div>
                </div>
          </div>
      </div>

  );
};
export default HomePage;
