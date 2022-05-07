import { FC } from "react";
import { useTranslate } from "react-polyglot";

const Lives: FC<{ lives: number }> = (props) => {
  const { lives } = props;
  const translate = useTranslate();

  return <div>{translate("info.lives", { lives })}</div>;
};
export default Lives;
