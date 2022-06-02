import { Position } from "../types";
import { CSSProperties, FC } from "react";
import { SHOW_WIREFRAMES } from "../settings";

/**
 * File: PositionableDiv.tsx
 *
 * This file contains a Position div tag "helper" which consists of
 * the position of the item/element that we want to put out,
 * its height, width, whether the position is centered,
 * its style, and the element itself inside the div tag
 *
 * @param props The width, height, position (center or not), the style, and the element itself
 * @constructor The PositionableDiv file
 */
const PositionableDiv: FC<
  Position & {
    width: number;
    height: number;
    isCenterPosition?: boolean;
    style?: Omit<CSSProperties, "width" | "height">;
  }
> = (props) => {

    // The position, width, height, whether the position is centered, the style, and the element itself
  const { x, y, width, height, isCenterPosition, style, children } = props;

  // If the position is center, then it will calculate the left and right variable values respectively
    // so that the position of the element is centered. Else, it will just return the x and y position as
    // the left and right variable values.
  const left = isCenterPosition ? x - width / 2 : x;
  const bottom = isCenterPosition ? y - height / 2 : y;

  return (
      // The Position div tag for the element that we are going to put out in the
      // playing field
    <div
      style={{
        ...style,
        width,
        height,
        left,
        bottom,
        position: "absolute",
        ...(SHOW_WIREFRAMES ? { border: "1px solid red" } : undefined),
      }}
    >
      {children}
    </div>
  );
};
// Exporting the PositionableDiv to be displayed in the playing field
export default PositionableDiv;
