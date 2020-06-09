import React, { useEffect, useState, useContext } from "react";

import classes from "./PlayerPanel.module.scss";
import { PlayerControls } from "../PlayerControls";

//icons
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import { PrettoSlider } from "../../common/PlaylistControls";
import { PlayerContext } from "../../../contexts/PlayerContext/PlayerContext";
import {
  setVolume,
  setSeekPosition,
} from "../../../contexts/PlayerContext/actions";
import { PlaylistButton } from "../../common/PlaylistControls";
import { AUDIO_IMAGE_SERVER } from "../../../constants";

const PlayerPanel = () => {
  const [statePlayer, dispatchPlayer] = useContext(PlayerContext);
  const [position, setPosition] = useState(0);
  useEffect(() => {
    setPosition(statePlayer.seekPosition);
    return () => {};
  }, [statePlayer.seekPosition]);

  const handleVolumeChange = (event, newValue) => {
    dispatchPlayer(setVolume(newValue));
    let volume = (newValue / 100).toFixed(1);
    statePlayer.currentSong.howl.volume(volume);
  };

  const handleProgressChange = () => {
    statePlayer.currentSong.howl.seek(statePlayer.seekPosition);
  };

  const formatTime = (secs) => {
    let minutes = Math.floor(secs / 60) || 0;
    let seconds = secs - minutes * 60 || 0;
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const setVolumeIcon = () => {
    if (statePlayer.volume === 0) {
      return <VolumeOffIcon />;
    } else if (statePlayer.volume > 0 && statePlayer.volume <= 50) {
      return <VolumeDownIcon />;
    } else return <VolumeUpIcon />;
  };

  const playerBgStyle = {
    // background: `url(${AUDIO_IMAGE_SERVER}/${statePlayer.currentSong.uuid}.${statePlayer.currentSong.imageType})`,
    backgroundImage: `url(${AUDIO_IMAGE_SERVER}/${statePlayer.currentSong.uuid}.${statePlayer.currentSong.imageType})`,
    // backgroundImage: `url(https://www.publicdomainpictures.net/pictures/30000/velka/plain-white-background.jpg)`,
    backgroundPosition: `center`,
    backgroundRepeat: `no-repeat`,
    backgroundSize: `cover`,
    backgroundСolor: `rgba(255,255,255,0.72)`,
  };

  return (
    <div className={classes.audioPlayer}>
      <div className={classes.audioPlayerRelative}>
        <div className={classes.audioPlayerBg} style={playerBgStyle}></div>
        <div className={classes.audioPlayerContent}>
          <div className={classes.audioPlayerWrapper}>
            <div className={classes.playerProgress}>
              <span className={classes.progressTime}>
                {formatTime(Math.round(statePlayer.seekPosition))}
              </span>
              <PrettoSlider
                value={typeof position === "number" ? position : 0}
                step={0.000001}
                min={0.0}
                max={statePlayer.currentSong.howl.duration()}
                onChange={(event, newValue) => {
                  dispatchPlayer(setSeekPosition(newValue));
                }}
                onMouseUp={handleProgressChange}
              />
              {/* <span
          className={classes.playerProgressLine}
          style={{ "--width-line-after": `${progressRate}px` }}
        ></span> */}
              <span className={classes.progressTime}>
                {formatTime(
                  Math.round(statePlayer.currentSong.howl.duration())
                )}
              </span>
            </div>
            <div className={classes.audioPlayerBottom}>
              <div className={classes.songTitle}>
                <span className={classes.title}>
                  {statePlayer.currentSong.name}
                </span>
                <a href="#artist" className={classes.artist}>
                  {statePlayer.currentSong.artist}
                </a>
              </div>
              <PlayerControls />
              <div className={classes.volumeCart}>
                <div className={classes.volume}>
                  {setVolumeIcon()}
                  <PrettoSlider
                    onChange={handleVolumeChange}
                    value={statePlayer.volume}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerPanel;
