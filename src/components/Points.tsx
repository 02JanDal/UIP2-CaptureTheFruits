import { FC } from "react";
import { useTranslate } from "react-polyglot";

const Points: FC<{ points: number }> = (props) => {
  const { points } = props;
  const translate = useTranslate();

  return <div>{translate("info.points", { points })}</div>;
};
export default Points;
