import { FC } from "react";

const Lives: FC<{ lives: number }> = (props) => {
  const { lives } = props;

  return <div>Lives: {lives}</div>;
};
export default Lives;
