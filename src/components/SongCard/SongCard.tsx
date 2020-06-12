import React, { FC } from "react";

import { SongType } from "../../contexts/PlayerContext/actions";
import { AUDIO_IMAGE_SERVER } from "../../constants";
import { LazyLoadImage } from "react-lazy-load-image-component";

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

import classes from "./SongCard.module.scss";

interface SongCardInputProps {
  song: SongType;
}
const SongCard: FC<SongCardInputProps> = ({ song }) => {
  const playSong = (song: SongType) => {
    song.howl.play();
  };
  // const pauseSong =

  return (
    <div className={classes.card}>
      <div className={classes.image}>
        <LazyLoadImage
          alt={song.name}
          effect="blur"
          src={`${AUDIO_IMAGE_SERVER}/${song.uuid}.${song.imageType}`}
          height={"100%"}
        />
      </div>
      <div className={classes.cardDescription}>
        <div className={classes.title}>
          <h3>{song.name}</h3>
          <h4>{song.artist}</h4>
        </div>
        <div className={classes.play}>
          <PlayCircleOutlineIcon />
        </div>
      </div>
    </div>
  );
};

export default SongCard;
