import React, { useContext, useEffect, useState } from "react";

import classes from "./PlayerControls.module.scss";
import { PlayerContext } from "../../../contexts/PlayerContext/PlayerContext";
import {
  togglePaused,
  toggleRepeat,
  toggleRandom,
  setCurrentSong,
  setSeekPosition,
} from "../../../contexts/PlayerContext/actions";

// icons
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import RepeatIcon from "@material-ui/icons/Repeat";
import RepeatOneIcon from "@material-ui/icons/RepeatOne";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import ShuffleIcon from "@material-ui/icons/Shuffle";

const PlayerControls = () => {
  const [statePlayer, dispatchPlayer] = useContext(PlayerContext);
  const [randomIndex, setRandomIndex] = useState(0);
  const [isSongEnded, setIsSongEnded] = useState(false);
  // const [isSkiped, setIsSkiped] = useState(false);

  useEffect(() => {
    if (statePlayer.isRepeat) {
      statePlayer.currentSong.howl.loop(true);
    } else {
      statePlayer.currentSong.howl.loop(false);
    }
    if (isSongEnded) {
      skipToNextSong();
    }
    statePlayer.currentSong.howl.on("end", function () {
      dispatchPlayer(setSeekPosition(0));

      if (!statePlayer.isRepeat) {
        setIsSongEnded(true);
        dispatchPlayer(togglePaused(true));
      }
    });
    statePlayer.currentSong.howl.on("play", function () {
      setIsSongEnded(false);
    });
    return () => {};
  }, [
    statePlayer.isRepeat,
    dispatchPlayer,
    statePlayer.currentSong.howl,
    statePlayer.isRandom,
    isSongEnded,
  ]);

  const playCurrentSong = () => {
    statePlayer.currentSong.howl.play();
    dispatchPlayer(togglePaused(false));
  };
  const pauseCurrentSong = () => {
    statePlayer.currentSong.howl.pause();
    dispatchPlayer(togglePaused(true));
  };

  const skipToNextSong = () => {
    let index = statePlayer.currentSong.id;
    setRandomIndex(Math.floor(Math.random() * statePlayer.songs.length));
    if (index >= 1 && index < statePlayer.songs.length) {
      statePlayer.songs[statePlayer.currentSong.id - 1].howl.stop();
      dispatchPlayer(togglePaused(false));
      dispatchPlayer(setSeekPosition(0));
      if (statePlayer.isRandom) {
        statePlayer.songs[randomIndex].howl.volume(
          (statePlayer.volume / 100).toFixed(1)
        );
        statePlayer.songs[randomIndex].howl.play();
      } else {
        statePlayer.songs[statePlayer.currentSong.id].howl.volume(
          (statePlayer.volume / 100).toFixed(1)
        );
        statePlayer.songs[statePlayer.currentSong.id].howl.play();
      }
    } else {
      statePlayer.songs[statePlayer.songs.length - 1].howl.stop();
      dispatchPlayer(togglePaused(false));
      dispatchPlayer(setSeekPosition(0));
      if (statePlayer.isRandom) {
        statePlayer.songs[randomIndex].howl.volume(
          (statePlayer.volume / 100).toFixed(1)
        );
        statePlayer.songs[randomIndex].howl.play();
      } else {
        statePlayer.songs[
          statePlayer.currentSong.id - statePlayer.songs.length
        ].howl.volume((statePlayer.volume / 100).toFixed(1));
        statePlayer.songs[
          statePlayer.currentSong.id - statePlayer.songs.length
        ].howl.play();
      }
    }
  };
  const skipToPreviousSong = () => {
    let index = statePlayer.currentSong.id;
    setRandomIndex(Math.floor(Math.random() * statePlayer.songs.length));
    if (index > 1 && index < statePlayer.songs.length) {
      statePlayer.songs[
        statePlayer.songs.length - statePlayer.currentSong.id
      ].howl.stop();
      dispatchPlayer(togglePaused(false));
      dispatchPlayer(setSeekPosition(0));
      if (statePlayer.isRandom) {
        statePlayer.songs[randomIndex].howl.volume(
          (statePlayer.volume / 100).toFixed(1)
        );
        statePlayer.songs[randomIndex].howl.play();
      } else {
        statePlayer.songs[
          statePlayer.songs.length - statePlayer.currentSong.id - 1
        ].howl.volume((statePlayer.volume / 100).toFixed(1));
        statePlayer.songs[
          statePlayer.songs.length - statePlayer.currentSong.id - 1
        ].howl.play();
      }
    } else if (index === statePlayer.songs.length) {
      statePlayer.songs[statePlayer.currentSong.id - 1].howl.stop();
      dispatchPlayer(togglePaused(false));
      dispatchPlayer(setSeekPosition(0));
      if (statePlayer.isRandom) {
        statePlayer.songs[randomIndex].howl.volume(
          (statePlayer.volume / 100).toFixed(1)
        );
        statePlayer.songs[randomIndex].howl.play();
      } else {
        statePlayer.songs[statePlayer.currentSong.id - 2].howl.volume(
          (statePlayer.volume / 100).toFixed(1)
        );
        statePlayer.songs[statePlayer.currentSong.id - 2].howl.play();
      }
    } else {
      statePlayer.songs[statePlayer.currentSong.id - 1].howl.stop();
      dispatchPlayer(togglePaused(false));
      dispatchPlayer(setSeekPosition(0));
      if (statePlayer.isRandom) {
        statePlayer.songs[randomIndex].howl.volume(
          (statePlayer.volume / 100).toFixed(1)
        );
        statePlayer.songs[randomIndex].howl.play();
      } else {
        statePlayer.songs[statePlayer.songs.length - 1].howl.volume(
          (statePlayer.volume / 100).toFixed(1)
        );
        statePlayer.songs[statePlayer.songs.length - 1].howl.play();
      }
    }
  };

  return (
    <div className={classes.controls}>
      {statePlayer.isRepeat ? (
        <RepeatOneIcon
          className={classes.activeRepeatIcon}
          onClick={() => dispatchPlayer(toggleRepeat(false))}
        />
      ) : (
        <RepeatIcon onClick={() => dispatchPlayer(toggleRepeat(true))} />
      )}
      <SkipPreviousIcon onClick={skipToPreviousSong} />
      {statePlayer.isPaused ? (
        <PlayCircleFilledIcon onClick={playCurrentSong} />
      ) : (
        <PauseCircleFilledIcon onClick={pauseCurrentSong} />
      )}
      <SkipNextIcon onClick={skipToNextSong} />
      {statePlayer.isRandom ? (
        <ShuffleIcon
          className={classes.shuffleIcon}
          onClick={() => dispatchPlayer(toggleRandom(false))}
        />
      ) : (
        <FormatListNumberedIcon
          onClick={() => dispatchPlayer(toggleRandom(true))}
        />
      )}
    </div>
  );
};

export default PlayerControls;
