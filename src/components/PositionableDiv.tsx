import { Position } from "../types";
import { CSSProperties, FC } from "react";

const PositionableDiv: FC<
  Position & {
    width: number;
    height: number;
    isCenterPosition?: boolean;
    style?: Omit<CSSProperties, "width" | "height">;
  }
> = (props) => {
  const { x, y, width, height, isCenterPosition, style, children } = props;
  const left = isCenterPosition ? x - width / 2 : x;
  const bottom = isCenterPosition ? y - height / 2 : y;
  return (
    <div
      style={{
        ...style,
        width,
        height,
        left,
        bottom,
        position: "absolute",
      }}
    >
      {children}
    </div>
  );
};
export default PositionableDiv;
