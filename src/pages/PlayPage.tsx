import React, { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlayingField from "../components/PlayingField";
import playingFields from "../data/playingFields";

export const PlayPage: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  if (!id) {
    return null;
  }

  const onFinished = (lives: number, points: number) => {
    navigate("/after-game", { state: { id, lives, points } });
  };

  return (
    <PlayingField field={playingFields[parseInt(id)]} onFinished={onFinished} />
  );
};
