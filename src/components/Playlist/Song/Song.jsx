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
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import { Howl, Howler } from "howler";
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
  toggleLoading,
} from "../../../contexts/PlayerContext/actions";
import {
  addSongToBasket,
  removeSongFromBasket,
  addSongToFavourite,
  removeSongFromFavourite,
} from "../../../contexts/ProfileContext/actions";
import { AUDIO_IMAGE_SERVER, ACCESS_TOKEN } from "../../../constants";
import { LikeButon } from "../../common/PlaylistControls";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import { IconButton, duration } from "@material-ui/core";
import { useViewport } from "../../../hooks/useViewport";

import noSongImage from "../../../static/images/microphone.jpg";

import { motion } from "framer-motion";
import { Spinner } from "../../common/Spinner";

const Song = ({ songId, toggleDrawer }) => {
  const [authState, authDispatch] = useContext(AuthContext);
  const [statePlayer, dispatchPlayer] = useContext(PlayerContext);
  const [stateProfile, dispatchProfile] = useContext(ProfileContext);
  const [songFetchingError, setSongFetchingError] = useState(false);
  const [isSongLoading, setIsSongLoading] = useState(false);
  const [isImageExist, setIsImageExist] = useState(true);
  const [openModalSign, setOpenModalSign] = useState(false);
  const [song, setSong] = useState("");
  const [songDuration, setSongDuration] = useState(0);
  const { width, height } = useViewport();

  const [isLiked, setIsLiked] = useState(false);

  const handleOpenSign = (state) => {
    setOpenModalSign(state);
  };

  useEffect(() => {
    return () => {};
  }, [statePlayer.isRepeat, width, songDuration]);

  const getSong = (songId) => {
    return statePlayer.songs.filter((song) => song.id === songId)[0];
  };

  useEffect(() => {
    const thisSong = getSong(songId);
    // musicAPI
    //   .checkIsSongImgExist(`/200x200/${thisSong.uuid}`)
    //   .then((response) => {
    //     if (response === 500) setIsImageExist(false);
    //   });
    setSong(thisSong);
    setIsLiked(
      stateProfile.favouriteSongs.indexOf(thisSong.id) !== -1 ? true : false
    );
    thisSong.howl.load();
    let progress;
    thisSong.howl.on("play", function () {
      dispatchPlayer(setCurrentSong(thisSong));
      dispatchPlayer(togglePlaying(true));
      dispatchPlayer(togglePaused(false));
      setIsSongLoading(false);
      dispatchPlayer(toggleLoading(false));
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
    thisSong.howl.on("load", function () {
      setSongDuration(thisSong.howl.duration());
    });
    thisSong.howl.once("load", function () {
      dispatchPlayer(toggleLoading(true));
      setIsSongLoading(true);
    });

    return () => {};
  }, [stateProfile.favouriteSongs]);

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
    dispatchPlayer(toggleLoading(false));
    if (!isSongLoading) {
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
        dispatchPlayer(toggleLoading(true));
      }
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

  const setLike = async (accountId, songId, token) => {
    let response = await musicAPI.setLike(accountId, songId, token);
    dispatchProfile(addSongToFavourite(songId));
  };
  const unlike = async (accountId, songId, token) => {
    let response = await musicAPI.unlike(accountId, songId, token);
    dispatchProfile(removeSongFromFavourite(songId));
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
              {isImageExist ? (
                <LazyLoadImage
                  alt={song.name}
                  effect="blur"
                  src={`${AUDIO_IMAGE_SERVER}/200x200/${song.uuid}`}
                  height={"100%"}
                  width={"100%"}
                  placeholderSrc={noSongImage}
                />
              ) : (
                <img src={noSongImage} alt={"no album image"} />
              )}

              <div className={classes.songSpinner}>
                {isSongLoading ? <Spinner /> : null}
              </div>
              <div
                className={classes.hoverPlay}
                onClick={handlePlayActionLargeDevices}
              >
                {isSongLoading ? null : (
                  <>
                    {statePlayer.currentSong.id === song.id &&
                    statePlayer.isPlaying &&
                    !statePlayer.isPaused ? (
                      <PauseIcon />
                    ) : (
                      <PlayArrowIcon />
                    )}
                  </>
                )}
              </div>
            </div>
          </td>
          <td
            className={classes.songName}
            onClick={handlePlayActionSmallDevices}
          >
            <div>
              <p>{song.name}</p>
              <p>{song.artist}</p>
            </div>
          </td>
          {/* <td className={classes.artistCell}>
            <a href={`#${song.artist}`}>{song.artist}</a>
          </td> */}
          <td className={classes.timeCell}>{song.length ?? 0}</td>
          <td className={classes.likeSongCell}>
            <motion.div
              whileTap={{ scale: 1.2 }}
              className={classes.favouriteIcon}
              onClick={() => setIsLiked((prevState) => !prevState)}
            >
              {isLiked ? (
                <FavoriteIcon
                  className={classes.liked}
                  onClick={() => {
                    unlike(
                      stateProfile.profile.idaccount,
                      song.id,
                      localStorage.getItem(ACCESS_TOKEN)
                    );
                  }}
                />
              ) : (
                <FavoriteBorderIcon
                  onClick={() => {
                    setLike(
                      stateProfile.profile.idaccount,
                      song.id,
                      localStorage.getItem(ACCESS_TOKEN)
                    );
                  }}
                />
              )}
            </motion.div>
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
                    ${song.price ?? 0}
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
                ${song.price ?? 0}
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
