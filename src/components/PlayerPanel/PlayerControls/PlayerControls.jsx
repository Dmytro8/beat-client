import React, { useContext, useEffect, useState } from "react";

import classes from "./PlayerControls.module.scss";
import { PlayerContext } from "../../../contexts/PlayerContext/PlayerContext";
import {
  togglePaused,
  toggleRepeat,
  toggleRandom,
  setSeekPosition,
  setRandomIndex,
} from "../../../contexts/PlayerContext/actions";

import KeyboardEventHandler from "react-keyboard-event-handler";

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
  const [isSongEnded, setIsSongEnded] = useState(false);

  useEffect(() => {
    if (statePlayer.isRepeat) {
      statePlayer.currentSong.howl.loop(true);
    } else {
      statePlayer.currentSong.howl.loop(false);
    }
    if (statePlayer.isRandom) {
      let num = generateRandomIndex();
      dispatchPlayer(setRandomIndex(num));
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

  useEffect(() => {
    if (isSongEnded && !statePlayer.isRepeat) {
      skipToNextSong();
    }
    return () => {};
  }, [isSongEnded]);

  const playCurrentSong = () => {
    statePlayer.currentSong.howl.play();
    dispatchPlayer(togglePaused(false));
  };

  const pauseCurrentSong = () => {
    statePlayer.currentSong.howl.pause();
    dispatchPlayer(togglePaused(true));
  };

  const togglePlay = () => {
    if (statePlayer.isPaused) {
      playCurrentSong();
    } else {
      pauseCurrentSong();
    }
  };

  const fastForwardSong = () => {
    if (
      statePlayer.currentSong.howl.duration() - 10 < statePlayer.seekPosition &&
      statePlayer.seekPosition < statePlayer.currentSong.howl.duration()
    ) {
      skipToNextSong();
    } else {
      statePlayer.currentSong.howl.seek(statePlayer.seekPosition + 4);
      if (statePlayer.isPaused) {
        dispatchPlayer(setSeekPosition(statePlayer.seekPosition + 4));
      }
    }
  };

  const fastRewindSong = () => {
    if (0 < statePlayer.seekPosition && statePlayer.seekPosition < 10) {
      skipToPreviousSong();
    } else {
      statePlayer.currentSong.howl.seek(statePlayer.seekPosition - 4);
      if (statePlayer.isPaused) {
        dispatchPlayer(setSeekPosition(statePlayer.seekPosition - 4));
      }
    }
  };

  const generateRandomIndex = () => {
    let num = Math.floor(Math.random() * statePlayer.songs.length);
    return num === statePlayer.currentSong.id - 1 ? generateRandomIndex() : num;
  };

  const setSongToPlay = (songId) => {
    statePlayer.songs[statePlayer.currentSong.id - 1].howl.stop();
    dispatchPlayer(togglePaused(false));
    dispatchPlayer(setSeekPosition(0));
    if (statePlayer.isRandom) {
      prepareSongToPlay(statePlayer.randomIndex);
    } else {
      prepareSongToPlay(songId);
    }
  };

  const prepareSongToPlay = (songId) => {
    statePlayer.songs[songId].howl.volume(
      (statePlayer.volume / 100).toFixed(1)
    );
    statePlayer.songs[songId].howl.play();
  };

  const skipToNextSong = () => {
    if (
      statePlayer.currentSong.id >= 1 &&
      statePlayer.currentSong.id < statePlayer.songs.length
    ) {
      setSongToPlay(statePlayer.currentSong.id);
    } else {
      setSongToPlay(statePlayer.currentSong.id - statePlayer.songs.length);
    }
  };
  const skipToPreviousSong = () => {
    if (
      statePlayer.currentSong.id > 1 &&
      statePlayer.currentSong.id < statePlayer.songs.length
    ) {
      setSongToPlay(statePlayer.currentSong.id);
    } else if (statePlayer.currentSong.id === statePlayer.songs.length) {
      setSongToPlay(statePlayer.currentSong.id - 2);
    } else {
      setSongToPlay(statePlayer.songs.length - 1);
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
      <KeyboardEventHandler
        handleKeys={["space"]}
        onKeyEvent={(key, e) => togglePlay()}
      />
      <KeyboardEventHandler
        handleKeys={["left"]}
        onKeyEvent={(key, e) => fastRewindSong()}
      />
      <KeyboardEventHandler
        handleKeys={["right"]}
        onKeyEvent={(key, e) => fastForwardSong()}
      />
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
