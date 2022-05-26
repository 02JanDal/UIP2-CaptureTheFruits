import React, { FC } from "react";
import { useParams } from "react-router-dom";
import PlayingField from "../components/PlayingField";
import playingFields from "../data/playingFields";

export const PlayPage: FC = () => {
  const { id } = useParams();
  if (!id) {
    return null;
  }
  return <PlayingField field={playingFields[parseInt(id)]} />;
};
