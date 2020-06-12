import React, { useContext, useState, useEffect, Fragment } from "react";
import { Playlist } from "../../components/Playlist";
import { musicAPI } from "../../api/musicAPI";
import { PlayerContext } from "../../contexts/PlayerContext/PlayerContext";
import { setPlaylist } from "../../contexts/PlayerContext/actions";
import { Spinner } from "../../components/common/FormControls";
import { LazyLoadImage } from "react-lazy-load-image-component";
import classes from "./MusicPage.module.scss";
import { AUDIO_IMAGE_SERVER } from "../../constants";
import { MusicNote } from "../../components/common/PlaylistControls";
import { ImgAmbilight } from "../../components/ImgAmbilight";

const MusicPage = () => {
  const [statePlayer, dispatchPlayer] = useContext(PlayerContext);
  const [isSongsLoading, setIsSongsLoading] = useState(true);
  useEffect(() => {
    console.log(statePlayer);
    const getAllSongs = async () => {
      setIsSongsLoading(true);
      const response = await musicAPI.getAllSongs();
      dispatchPlayer(setPlaylist(response.slice(0, 3)));
      setIsSongsLoading(false);
    };
    getAllSongs();
    return () => {
      console.log(statePlayer);
    };
  }, [dispatchPlayer]);
  return (
    <Fragment>
      {isSongsLoading ? (
        <div
          style={{
            display: "grid",
            placeItems: "center",
          }}
        >
          <Spinner />
        </div>
      ) : (
        <div className={classes.playlistWrapper}>
          <Fragment>
            <div className={classes.songImageWrapper}>
              {(Object.keys(statePlayer.currentSong).length === 0 &&
                statePlayer.currentSong.constructor === Object) ||
              statePlayer.currentSong.imageType === null ? (
                <Fragment>
                  <div className={classes.musicNoteIcon}>
                    <MusicNote />
                  </div>
                </Fragment>
              ) : (
                <ImgAmbilight />
              )}
            </div>
            <Playlist />
          </Fragment>
        </div>
      )}
    </Fragment>
  );
};

export default MusicPage;
