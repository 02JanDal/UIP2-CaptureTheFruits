import { FC } from "react";

const Points: FC<{ points: number }> = (props) => {
  const { points } = props;

  return <div>Points: {points}</div>;
};
export default Points;
