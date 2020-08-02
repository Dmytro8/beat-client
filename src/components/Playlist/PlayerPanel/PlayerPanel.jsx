import React, { useEffect, useState, useContext } from "react";

import classes from "./PlayerPanel.module.scss";
import { PlayerControls } from "../PlayerControls";

//icons
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import RepeatIcon from "@material-ui/icons/Repeat";
import RepeatOneIcon from "@material-ui/icons/RepeatOne";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";

import { PrettoSlider } from "../../common/PlaylistControls";
import { PlayerContext } from "../../../contexts/PlayerContext/PlayerContext";

import {
  toggleRepeat,
  setVolume,
  setSeekPosition,
  toggleRandom,
} from "../../../contexts/PlayerContext/actions";
import { PlaylistButton } from "../../common/PlaylistControls";
import { AUDIO_IMAGE_SERVER } from "../../../constants";

import { motion } from "framer-motion";
import { useViewport } from "../../../hooks/useViewport";

const playerMotionVariants = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", delay: 0.2 },
  },
  exit: {
    y: 100,
    opacity: 0,
    transition: { type: "spring", delay: 0.2 },
  },
};

const PlayerPanel = () => {
  const [statePlayer, dispatchPlayer] = useContext(PlayerContext);
  const [position, setPosition] = useState(0);
  const [isVolumeControlOpen, setIsVolumeControlOpen] = useState(false);
  const { width, height } = useViewport();

  useEffect(() => {
    if (width > 600) {
      setIsVolumeControlOpen(false);
    }
    setPosition(statePlayer.seekPosition);
    return () => {};
  }, [statePlayer.seekPosition, width]);
  const handleVolumeChange = (event, newValue) => {
    dispatchPlayer(setVolume(newValue));
    let volume = (newValue / 100).toFixed(1);
    statePlayer.currentSong.howl.volume(volume);
  };

  const toggleVolumeControl = () => {
    if (width <= 600) {
      setIsVolumeControlOpen(!isVolumeControlOpen);
    }
  };

  const handleVolumeControl = () => {
    if (width <= 600) {
      if (isVolumeControlOpen)
        return (
          <PrettoSlider
            orientation="vertical"
            onChange={handleVolumeChange}
            value={statePlayer.volume}
            className={classes.volume__range}
          />
        );
    } else
      return (
        <PrettoSlider
          onChange={handleVolumeChange}
          value={statePlayer.volume}
          className={classes.volume__range}
        />
      );
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
      return <VolumeOffIcon onClick={toggleVolumeControl} />;
    } else if (statePlayer.volume > 0 && statePlayer.volume <= 50) {
      return <VolumeDownIcon onClick={toggleVolumeControl} />;
    } else return <VolumeUpIcon onClick={toggleVolumeControl} />;
  };

  const playerBgStyle = {
    backgroundImage: `url(${AUDIO_IMAGE_SERVER}/1000x1000/${statePlayer.currentSong.uuid})`,
    backgroundPosition: `center`,
    backgroundRepeat: `no-repeat`,
    backgroundSize: `cover`,
    backgroundСolor: `rgba(255,255,255,0.72)`,
  };

  return (
    <motion.div
      variants={playerMotionVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={classes.audioPlayer}
    >
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
              <div className={classes.rightContols}>
                {statePlayer.isRandom ? (
                  <ShuffleIcon
                    className={classes.shuffleIcon}
                    onClick={() => dispatchPlayer(toggleRandom(false))}
                  />
                ) : (
                  <FormatListNumberedIcon
                    className={classes.formatListNumberedIcon}
                    onClick={() => dispatchPlayer(toggleRandom(true))}
                  />
                )}
                {statePlayer.isRepeat ? (
                  <RepeatOneIcon
                    className={classes.activeRepeatIcon}
                    onClick={() => dispatchPlayer(toggleRepeat(false))}
                  />
                ) : (
                  <RepeatIcon
                    className={classes.repeatIcon}
                    onClick={() => dispatchPlayer(toggleRepeat(true))}
                  />
                )}
                <div className={classes.volume}>
                  {setVolumeIcon()}
                  {handleVolumeControl()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlayerPanel;
