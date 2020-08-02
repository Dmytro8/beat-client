import React, { FC } from "react";

import classes from "./PlayerDrawer.module.scss";
import { SongType } from "../../../contexts/PlayerContext/types";

type PlayerDrawerPropsType = {
  song: SongType;
};

export const PlayerDrawer: FC<PlayerDrawerPropsType> = (song) => {
  console.log(song);

  return <div>Hello</div>;
};
