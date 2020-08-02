import React, { useContext, useState, useEffect, Fragment } from "react";
import { Playlist } from "../../components/Playlist";
import { musicAPI } from "../../api/musicAPI";
import { PlayerContext } from "../../contexts/PlayerContext/PlayerContext";
import { setPlaylist } from "../../contexts/PlayerContext/actions";
import { Spinner } from "../../components/common/FormControls";
import classes from "./MusicPage.module.scss";
import { MusicNote } from "../../components/common/PlaylistControls";
import { ImgAmbilight } from "../../components/ImgAmbilight";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { updateErrorStatus } from "../../contexts/AuthContext/actions";
import { ERROR } from "../../constants/route.urls";
import { useHistory } from "react-router-dom";

const MusicPage = () => {
  const [authState, authDispatch]: any = useContext(AuthContext);
  const [statePlayer, dispatchPlayer]: any = useContext(PlayerContext);
  const [isSongsLoading, setIsSongsLoading] = useState(true);
  let history = useHistory();
  useEffect(() => {
    const getAllSongs = async () => {
      setIsSongsLoading(true);
      const response = await musicAPI.getAllSongs();
      if (response.status !== 500) {
        dispatchPlayer(setPlaylist(response));
        setIsSongsLoading(false);
      } else {
        authDispatch(updateErrorStatus(true));
        history.push(ERROR);
      }
    };
    getAllSongs();
    return () => {};
  }, [dispatchPlayer]);
  return (
    <Fragment>
      {isSongsLoading ? (
        <div
          style={{
            display: "grid",
            placeItems: "center",
            height: "100%",
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
