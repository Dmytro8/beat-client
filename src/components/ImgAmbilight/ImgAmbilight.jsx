import React, { useContext, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { PlayerContext } from "../../contexts/PlayerContext/PlayerContext";
import { AUDIO_IMAGE_SERVER } from "../../constants";
import classes from "./ImgAmbilight.module.scss";
import classNames from "classnames/bind";
import { musicAPI } from "../../api/musicAPI";

const ImgAmbilight = ({ src, isLocal = false }) => {
  const [statePlayer, dispatchPlayer] = useContext(PlayerContext);
  const [isImageExist, setIsImageExist] = useState(true);
  let cx = classNames.bind(classes);
  let bgAmbilightStyle = cx({
    bgAmbilight: true,
    bgAmbilightActive: !statePlayer.isPaused && !isLocal,
  });

  useEffect(() => {
    if (statePlayer.isPlaying) {
      musicAPI
        .checkIsSongImgExist(`/200x200/${statePlayer.currentSong.uuid}`)
        .then((response) => {
          if (response === 500) setIsImageExist(false);
        });
    }

    return () => {};
  }, [statePlayer.isPlaying]);
  return (
    <div className={classes.imageAmbilight}>
      <div className={bgAmbilightStyle}>
        {isLocal || !isImageExist ? (
          <img src={src} alt={"no album image"} />
        ) : (
          <LazyLoadImage
            alt={statePlayer.currentSong.name ?? "no album image"}
            effect="blur"
            src={src}
            height={"100%"}
            visibleByDefault={true}
          />
        )}
      </div>
      <div className={classes.image}>
        <div className={classes.imageWrapper}>
          {isLocal ? (
            <img src={src} alt={"no album image"} />
          ) : (
            <LazyLoadImage
              alt={statePlayer.currentSong.name ?? "no album image"}
              effect="blur"
              src={src}
              height={"100%"}
              visibleByDefault={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImgAmbilight;
