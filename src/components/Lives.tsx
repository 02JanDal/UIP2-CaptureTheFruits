import { FC } from "react";
import { useTranslate } from "react-polyglot";

/**
 * Files: Lives.tsx
 *
 * This file contains the view of the
 * number of lives of the player.
 *
 * @param props The total lives that the player currently has
 * @constructor The Lives file
 */
const Lives: FC<{ lives: number }> = (props) => {
  // The total lives that the player currently has
  const { lives } = props;

  // Using the useTranslate() constructor to access the strings that
  // are written in the dictionary
  const translate = useTranslate();

  // Showing the current total lives
  return <div>{translate("info.lives", { lives })}</div>;
};
// Exporting the Lives to be displayed in the playing field
export default Lives;
