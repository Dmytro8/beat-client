import React, { useEffect, useState, useContext } from "react";

import classes from "./FavouritePage.module.scss";
import { AccountHeader } from "../../common/AccountHeader";
import { musicAPI } from "../../../../api/musicAPI";
import { ACCESS_TOKEN } from "../../../../constants";
import { ProfileContext } from "../../../../contexts/ProfileContext/ProfileContext";
import { setFavouriteSongs } from "../../../../contexts/ProfileContext/actions";
import { PlayerContext } from "../../../../contexts/PlayerContext/PlayerContext";
import { Playlist } from "../../../../components/Playlist";
import styled from "styled-components";
import { Spinner } from "../../../../components/common/Spinner";
import { setPlaylist } from "../../../../contexts/PlayerContext/actions";
import { PlayerPanel } from "../../../../components/Playlist/PlayerPanel";

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  justify-content: center;
  align-content: center;
`;

export const FavouritePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profileState, profileDispatch]: any = useContext(ProfileContext);
  const [playerState, playerDispatch]: any = useContext(PlayerContext);

  useEffect(() => {
    const getAllSongs = async () => {
      setIsLoading(true);
      const response = await musicAPI.getAllSongs();
      if (response.status !== 500) {
        playerDispatch(setPlaylist(response));
        setIsLoading(false);
      } else {
        // authDispatch(updateErrorStatus(true));
      }
    };
    getAllSongs();
    return () => {};
  }, []);

  return (
    <div className={classes.favouritePage}>
      <AccountHeader title={"Favourite subpage"} />
      <div className={classes.favouritePage__contentGrid}>
        <div>
          {isLoading ? (
            <SpinnerContainer>
              <Spinner />
            </SpinnerContainer>
          ) : (
            <Playlist isFavourites={true} />
          )}
        </div>
        <div
          style={{ position: "relative", height: "100px", overflow: "hidden" }}
        >
          {playerState.isPlaying ? <PlayerPanel isFavourites={true} /> : null}
        </div>
      </div>
    </div>
  );
};
