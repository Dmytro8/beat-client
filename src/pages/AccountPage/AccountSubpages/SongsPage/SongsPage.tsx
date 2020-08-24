import React, { useContext, useEffect, useState } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

import classes from "./SongsPage.module.scss";

import { AccountHeader } from "../../common/AccountHeader";
import { PlayerContext } from "../../../../contexts/PlayerContext/PlayerContext";
import { SongType } from "../../../../contexts/PlayerContext/types";
import { musicAPI } from "../../../../api/musicAPI";
import { AUDIO_IMAGE_SERVER } from "../../../../constants";
import { SongsTable } from "../../common/SongsTable";

export const SongsPage = () => {
  const [playerState, playerDispatch]: any = useContext(PlayerContext);

  useEffect(() => {
    return () => {};
  }, []);

  const renderSongs = () => {
    return playerState.songs.map((song: SongType) => (
      <tr>
        <td>
          <LazyLoadImage
            alt={song.name}
            effect="blur"
            src={`${AUDIO_IMAGE_SERVER}/200x200/${song.uuid}`}
            height={"100%"}
          />
        </td>
        <td>{song.name}</td>
        <td>{song.artist}</td>
        <td>{song.length ?? 0}</td>
        <td>Edit</td>
        <td>Delete</td>
      </tr>
    ));
  };

  return (
    <div className={classes.songs}>
      <AccountHeader title={"Songs subpage"} />
      <div>
        <SongsTable />
        {/* <table>
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th className={classes.playlistTable__artist}>Artist</th>
              <th className={classes.playlistTable__time}>Time</th>
              <th className={classes.playlistTable__addToFavourite}></th>
              <th className={classes.playlistTable__price}></th>
            </tr>
          </thead>
          <tbody>{renderSongs()}</tbody>
        </table> */}
      </div>
    </div>
  );
};
