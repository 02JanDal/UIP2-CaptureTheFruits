import { FC } from "react";
import { useTranslate } from "react-polyglot";

/**
 * File: Points.tsx
 *
 * This file contains the view of the
 * number of points.
 *
 * @param props The total points that the player currently has
 * @constructor The Points file
 */
const Points: FC<{ points: number }> = (props) => {
  // The total points that the player currently has
  const { points } = props;

  // Using the useTranslate() constructor to access the strings that
  // are written in the dictionary
  const translate = useTranslate();

  // Showing the current total points
  return <div>{translate("info.points", { points })}</div>;
};
// Exporting the Points to be displayed in the playing field
export default Points;
