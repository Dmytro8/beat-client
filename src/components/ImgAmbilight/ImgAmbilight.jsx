import React, { useContext, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { PlayerContext } from "../../contexts/PlayerContext/PlayerContext";
import { AUDIO_IMAGE_SERVER } from "../../constants";
import classes from "./ImgAmbilight.module.scss";
import classNames from "classnames/bind";

const ImgAmbilight = () => {
  const [statePlayer, dispatchPlayer] = useContext(PlayerContext);
  let cx = classNames.bind(classes);
  let bgAmbilightStyle = cx({
    bgAmbilight: true,
    bgAmbilightActive: !statePlayer.isPaused,
  });

  useEffect(() => {
    return () => {};
  }, [statePlayer.isPlaying]);
  return (
    <div className={classes.imageAmbilight}>
      <div className={bgAmbilightStyle}>
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
