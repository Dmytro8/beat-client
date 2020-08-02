import React, { useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { PlayerContext } from "../../contexts/PlayerContext/PlayerContext";
import { AUDIO_IMAGE_SERVER } from "../../constants";
import classes from "./ImgAmbilight.module.scss";

const ImgAmbilight = () => {
  const [statePlayer, dispatchPlayer] = useContext(PlayerContext);
  return (
    <div className={classes.imageAmbilight}>
      <div className={classes.bgAmbilight}>
        <LazyLoadImage
          alt={statePlayer.currentSong.name}
          effect="blur"
          src={`${AUDIO_IMAGE_SERVER}/1000x1000/${statePlayer.currentSong.uuid}`}
          height={"100%"}
          visibleByDefault={true}
        />
      </div>
      <div className={classes.image}>
        <div className={classes.imageWrapper}>
          <LazyLoadImage
            alt={statePlayer.currentSong.name}
            effect="blur"
            src={`${AUDIO_IMAGE_SERVER}/1000x1000/${statePlayer.currentSong.uuid}`}
            height={"100%"}
            visibleByDefault={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ImgAmbilight;
