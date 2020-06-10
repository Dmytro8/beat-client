import React, { useEffect, useState, Fragment, useContext } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";

//Material imports
import Button from "@material-ui/core/Button";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import AddIcon from "@material-ui/icons/Add";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";

import { Howl, Howler } from "howler";
import { Spinner } from "../../common/FormControls";
import { musicAPI } from "../../../api/musicAPI";
import { LazyLoadImage } from "react-lazy-load-image-component";

import classes from "./Song.module.scss";
import classnames from "classnames";

import { PlayerContext } from "../../../contexts/PlayerContext/PlayerContext";
import { ProfileContext } from "../../../contexts/ProfileContext/ProfileContext";
import {
  setCurrentSong,
  togglePlaying,
  setHowl,
  togglePaused,
  setSeekPosition,
} from "../../../contexts/PlayerContext/actions";
import {
  addSongToBasket,
  removeSongFromBasket,
} from "../../../contexts/ProfileContext/actions";
import { AUDIO_IMAGE_SERVER } from "../../../constants";
import { LikeButon } from "../../common/PlaylistControls";

const Song = ({ songId }) => {
  const [statePlayer, dispatchPlayer] = useContext(PlayerContext);
  const [stateProfile, dispatchProfile] = useContext(ProfileContext);
  const [songFetchingError, setSongFetchingError] = useState(false);
  const [isSongLoading, setIsSongLoading] = useState(false);
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

  const addToBasket = (songId) => {
    if (!stateProfile.basket.includes(songId)) {
      dispatchProfile(addSongToBasket(songId));
    }
  };

  const removeFromBasket = (songId) => {
    if (stateProfile.basket.includes(songId)) {
      dispatchProfile(removeSongFromBasket(songId));
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
            </div>
          </td>
          <td>{song.name}</td>
          <td className={classes.artistCell}>
            <a href={`#${song.artist}`}>{song.artist}</a>
          </td>
          <td>{song.length}</td>
          <td className={classes.likeSongCell}>
            <AddIcon />
          </td>
          <td className={classes.priceCell}>
            {stateProfile.basket.includes(songId) ? (
              <Button
                className={classes.cartButton}
                onClick={() => removeFromBasket(songId)}
              >
                <span className={classes.basketRemove}>
                  <RemoveShoppingCartIcon className={classes.shoppingCart} />
                  <CloseIcon className={classes.removeIcon} />
                </span>
                <span className={classes.basketDone}>
                  <ShoppingCartIcon />
                  <DoneIcon className={classes.doneIcon} />
                </span>
              </Button>
            ) : (
              <Button
                className={classes.cartButton}
                startIcon={
                  <AddShoppingCartIcon className={classes.shoppingCart} />
                }
                onClick={() => addToBasket(songId)}
              >
                $27
              </Button>
            )}
          </td>
        </tr>
      )}
    </Fragment>
  );
};

export default Song;
