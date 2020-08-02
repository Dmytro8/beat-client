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
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { Howl, Howler } from "howler";
import { Spinner } from "../../common/FormControls";
import { musicAPI } from "../../../api/musicAPI";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { NotLoggingModal } from "../../common/Modals/NotLoggingModal";

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
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import { IconButton } from "@material-ui/core";
import { useViewport } from "../../../hooks/useViewport";

const Song = ({ songId, toggleDrawer }) => {
  const [authState, authDispatch] = useContext(AuthContext);
  const [statePlayer, dispatchPlayer] = useContext(PlayerContext);
  const [stateProfile, dispatchProfile] = useContext(ProfileContext);
  const [songFetchingError, setSongFetchingError] = useState(false);
  const [isSongLoading, setIsSongLoading] = useState(false);
  const [openModalSign, setOpenModalSign] = useState(false);
  const [song, setSong] = useState("");
  const { width, height } = useViewport();

  const handleOpenSign = (state) => {
    setOpenModalSign(state);
  };

  useEffect(() => {
    return () => {};
  }, [statePlayer.isRepeat, width]);

  const getSong = (songId) => {
    return statePlayer.songs.filter((song) => song.id === songId)[0];
  };

  useEffect(() => {
    const thisSong = getSong(songId);
    setSong(thisSong);
    let progress;
    thisSong.howl.on("play", function () {
      dispatchPlayer(setCurrentSong(thisSong));
      dispatchPlayer(togglePlaying(true));
      dispatchPlayer(togglePaused(false));
      progress = setInterval(() => {
        dispatchPlayer(setSeekPosition(thisSong.howl.seek()));
      }, 300);
    });
    thisSong.howl.on("stop", function () {
      clearInterval(progress);
    });
    thisSong.howl.on("pause", function () {
      clearInterval(progress);
    });
    thisSong.howl.on("end", function () {
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
      // dispatchPlayer(togglePlaying(false));
    };
  }, []);

  const handlePlayActionLargeDevices = () => {
    if (width >= 1024) {
      togglePlay();
    }
  };

  const handlePlayActionSmallDevices = () => {
    if (width <= 1024) {
      togglePlay();
    }
  };

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
          <td
            className={classes.songImageCell}
            onClick={handlePlayActionSmallDevices}
          >
            <div className={classes.songImage}>
              {song.imageType === null ? (
                <div className={classes.musicNoteIcon}>
                  <MusicNoteIcon />
                </div>
              ) : (
                <LazyLoadImage
                  alt={song.name}
                  effect="blur"
                  src={`${AUDIO_IMAGE_SERVER}/1000x1000/${song.uuid}`}
                  height={"100%"}
                />
              )}
              {/* ///// */}
              {/* Here can be the problem  */}
              {/* ///// */}
              <div
                className={classes.hoverPlay}
                onClick={handlePlayActionLargeDevices}
              >
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
          <td
            className={classes.songName}
            onClick={handlePlayActionSmallDevices}
          >
            {song.name}
          </td>
          <td className={classes.artistCell}>
            <a href={`#${song.artist}`}>{song.artist}</a>
          </td>
          <td className={classes.timeCell}>{song.length}</td>
          <td className={classes.likeSongCell}>
            <AddIcon />
          </td>
          <td className={classes.priceCell}>
            {authState.isAuthenticated ? (
              <Fragment>
                {stateProfile.basket.includes(songId) ? (
                  <Button
                    className={classes.cartButton}
                    onClick={() => removeFromBasket(songId)}
                  >
                    <span className={classes.basketRemove}>
                      <RemoveShoppingCartIcon
                        className={classes.shoppingCart}
                      />
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
              </Fragment>
            ) : (
              <Button
                className={classes.cartButton}
                startIcon={
                  <AddShoppingCartIcon className={classes.shoppingCart} />
                }
                onClick={() => handleOpenSign(true)}
              >
                $27
              </Button>
            )}
          </td>
          <td className={classes.moreVertIcon}>
            <IconButton onClick={toggleDrawer(true, song)}>
              <MoreVertIcon />
            </IconButton>
          </td>
        </tr>
      )}
      <NotLoggingModal
        open={openModalSign}
        handleCloseModalSign={() => handleOpenSign(false)}
      />
    </Fragment>
  );
};

export default Song;
