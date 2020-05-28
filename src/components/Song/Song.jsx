import React, { useEffect, useState, Fragment, useContext } from "react";
import { Spinner } from "../common/FormControls";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import MusicNoteIcon from "@material-ui/icons/MusicNote";

import { Howl, Howler } from "howler";
import { musicAPI } from "../../api/musicAPI";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import classes from "./Song.module.scss";
import classnames from "classnames";
import { PlayerContext } from "../../contexts/PlayerContext/PlayerContext";
import {
  setCurrentSong,
  togglePlaying,
  setHowl,
  togglePaused,
  setSeekPosition,
} from "../../contexts/PlayerContext/actions";
import { AUDIO_IMAGE_SERVER } from "../../constants";

const Song = ({ songId }) => {
  // const { togglePlayPause, ready, loading, playing } = useAudioPlayer({
  //   src: `https://beatstart.herokuapp.com/audio/music`,
  //   format: song.type,
  //   autoplay: false,
  // });

  // if (!ready && !loading) return <div>No audio to play</div>;
  // if (loading) return <Spinner />;
  const [statePlayer, dispatchPlayer] = useContext(PlayerContext);
  const [songFetchingError, setSongFetchingError] = useState(false);
  const [isSongLoading, setIsSongLoading] = useState(false);
  const [songTime, setSongTime] = useState(null);
  const [song, setSong] = useState("");

  useEffect(() => {
    return () => {};
  }, [statePlayer.isRepeat]);

  useEffect(() => {
    setSong(statePlayer.songs[songId - 1]);
    let progress;
    statePlayer.songs[songId - 1].howl.on("play", function () {
      dispatchPlayer(setCurrentSong(statePlayer.songs[songId - 1]));
      dispatchPlayer(togglePlaying(true));
      dispatchPlayer(togglePaused(false));
      progress = setInterval(() => {
        dispatchPlayer(
          setSeekPosition(statePlayer.songs[songId - 1].howl.seek())
        );
      }, 300);
    });
    statePlayer.songs[songId - 1].howl.on("stop", function () {
      clearInterval(progress);
    });
    statePlayer.songs[songId - 1].howl.on("pause", function () {
      clearInterval(progress);
    });
    statePlayer.songs[songId - 1].howl.on("end", function () {
      clearInterval(progress);
    });
    // onload: () => {
    //   setIsSongLoading(false);
    // },
    // onloaderror: () => {
    //   // setSongFetchingError(true);
    // },
    // onplay: (songId) => {
    //   dispatchPlayer(setCurrentSong(song.id));
    //   dispatchPlayer(togglePlaying(true));
    // },
    // onpause: (songId) => {},
    // setSong(songHowl);
    // Fires when the sound finishes playing.

    return () => {
      dispatchPlayer(togglePlaying(false));
      // setIsSongLoaded(false);
    };
  }, []);

  const togglePlay = () => {
    if (
      statePlayer.currentSong.id === songId &&
      statePlayer.isPlaying &&
      !statePlayer.isPaused
    ) {
      dispatchPlayer(togglePaused(true));
      song.howl.pause();
    } else if (
      statePlayer.currentSong.id === songId &&
      statePlayer.isPlaying &&
      statePlayer.isPaused
    ) {
      dispatchPlayer(togglePaused(false));
      song.howl.volume((statePlayer.volume / 100).toFixed(1));
      song.howl.play();
    } else {
      Howler.stop();
      dispatchPlayer(togglePaused(false));
      dispatchPlayer(setSeekPosition(0));
      song.howl.volume((statePlayer.volume / 100).toFixed(1));
      song.howl.play();

      setIsSongLoading(true);
    }
  };
  return (
    <Fragment>
      {songFetchingError ? (
        <span>songFetchingError</span>
      ) : (
        <tr
          className={`${classes.songRow} ${
            statePlayer.currentSong.id === songId && statePlayer.isPlaying
              ? classes.songRowActive
              : null
          }`}
        >
          <td className={classes.songImageCell}>
            <div className={classes.songImage}>
              {song.imageType === null ? (
                <div className={classes.musicNoteIcon}>
                  <MusicNoteIcon />
                </div>
              ) : (
                <LazyLoadImage
                  alt={song.name}
                  effect="blur"
                  src={`${AUDIO_IMAGE_SERVER}/${song.uuid}.${song.imageType}`}
                  height={"100%"}
                />
              )}

              <div className={classes.hoverPlay} onClick={togglePlay}>
                {statePlayer.currentSong.id === song.id &&
                statePlayer.isPlaying &&
                !statePlayer.isPaused ? (
                  <PauseIcon />
                ) : (
                  <PlayArrowIcon />
                )}
              </div>
              {/* <img
                src={`https://beatstart.herokuapp.com/audio/getAudioImage/${songDetails.uuid}.${songDetails.imageType}`}
                alt={songDetails.name}
                srcSet=""
              /> */}
            </div>
          </td>
          <td>{song.name}</td>
          <td className={classes.artistCell}>
            <a href={`#${song.artist}`}>{song.artist}</a>
          </td>
          <td>{song.length}</td>
          <td>$27</td>
          <td>
            <Button
              className={classes.addButton}
              startIcon={<ShoppingCartIcon />}
            >
              Add
            </Button>
          </td>
        </tr>
      )}
    </Fragment>
  );
};

export default Song;
