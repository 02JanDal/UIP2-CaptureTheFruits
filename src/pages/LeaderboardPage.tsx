import { FC } from "react";
import { Link } from "react-router-dom";
import { useTranslate } from "react-polyglot";
import { useLeaderboard } from "../leaderboard";

const HomePage: FC = () => {
  const translate = useTranslate();
  const leaderboard = useLeaderboard();

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
          fontSize: 70,
          height: "100%",
          width: "100%",
          textAlign: "center",
        }}
      >
        {translate("leaderboard.title")}
      </div>
      <table>
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
    </div>
  );
};
export default HomePage;
