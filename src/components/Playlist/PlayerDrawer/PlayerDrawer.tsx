import React, { FC, useContext, useEffect, useState } from "react";

import classes from "./PlayerDrawer.module.scss";
import { SongType } from "../../../contexts/PlayerContext/types";
import { AUDIO_IMAGE_SERVER, ACCESS_TOKEN } from "../../../constants";
import { LazyLoadImage } from "react-lazy-load-image-component";
import noSongImage from "../../../static/images/microphone.jpg";
import { musicAPI } from "../../../api/musicAPI";
import { ProfileContext } from "../../../contexts/ProfileContext/ProfileContext";
import {
  addSongToFavourite,
  removeSongFromFavourite,
} from "../../../contexts/ProfileContext/actions";
import { Spinner } from "../../common/Spinner";
import styled from "styled-components";

type OptionPropsType = {
  loadingStatus: boolean;
};

const Option = styled.li`
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  position: relative;
  color: ${(props: OptionPropsType) => {
    if (props.loadingStatus) return "#666";
    else return "white";
  }};
  pointer-events: ${(props: OptionPropsType) => {
    if (props.loadingStatus) return "none";
    else return "auto";
  }};
`;

type PlayerDrawerPropsType = {
  drawerSong: SongType | null;
};

export const PlayerDrawer: FC<PlayerDrawerPropsType> = ({ drawerSong }) => {
  console.log(drawerSong);
  const [stateProfile, dispatchProfile]: any = useContext(ProfileContext);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    return () => {};
  }, [stateProfile.favouriteSongs]);

  const setLike = async (accountId: number, songId: number, token: string) => {
    setIsLoading(true);
    let response = await musicAPI.setLike(accountId, songId, token);
    dispatchProfile(addSongToFavourite(songId));
    setIsLoading(false);
  };
  const unlike = async (accountId: number, songId: number, token: string) => {
    setIsLoading(true);
    let response = await musicAPI.unlike(accountId, songId, token);
    dispatchProfile(removeSongFromFavourite(songId));
    setIsLoading(false);
  };

  return (
    <section className={classes.songDrawer}>
      <div className={classes.songDrawer__imgContainer}>
        <div className={classes.songDrawer__imgWrapper}>
          {drawerSong ? (
            <LazyLoadImage
              // @ts-ignore
              alt={drawerSong.name}
              effect="blur"
              // @ts-ignore
              src={`${AUDIO_IMAGE_SERVER}/200x200/${drawerSong.uuid}`}
              height={"100%"}
              width={"100%"}
              placeholderSrc={noSongImage}
            />
          ) : null}
        </div>
      </div>
      <div className={classes.songDrawer__details}>
        <h3>{drawerSong?.name}</h3>
        <h5>{drawerSong?.artist}</h5>
      </div>
      <div className={classes.songDrawer__options}>
        <ul>
          {stateProfile.favouriteSongs.indexOf(drawerSong?.id) !== -1 ? (
            <Option
              loadingStatus={isLoading}
              onClick={() =>
                unlike(
                  stateProfile.profile.idaccount,
                  // @ts-ignore
                  drawerSong?.id,
                  localStorage.getItem(ACCESS_TOKEN)
                )
              }
            >
              Remove from Favourites
              {isLoading ? (
                <Spinner
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "50%",
                    marginLeft: "-15px",
                  }}
                />
              ) : null}
            </Option>
          ) : (
            <Option
              loadingStatus={isLoading}
              onClick={() =>
                setLike(
                  stateProfile.profile.idaccount,
                  // @ts-ignore
                  drawerSong?.id,
                  localStorage.getItem(ACCESS_TOKEN)
                )
              }
            >
              Add to Favourites
              {isLoading ? (
                <Spinner
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "50%",
                    marginLeft: "-15px",
                  }}
                />
              ) : null}
            </Option>
          )}
        </ul>
      </div>
    </section>
  );
};
