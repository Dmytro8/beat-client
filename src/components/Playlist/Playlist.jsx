import React, { useContext, useEffect, useState } from "react";
import { Song } from "./Song";
import { PlayerContext } from "../../contexts/PlayerContext/PlayerContext";
import { Howl, Howler } from "howler";

import classes from "./Playlist.module.scss";
import { AUDIO_SERVER } from "../../constants";

import { setHowl } from "../../contexts/PlayerContext/actions";
import { PlayerPanel } from "./PlayerPanel";

const Playlist = () => {
  const [statePlayer, dispatchPlayer] = useContext(PlayerContext);
  const [songItems, setSongItems] = useState(null);
  useEffect(() => {
    const items = statePlayer.songs.map((song) => {
      dispatchPlayer(
        setHowl(
          new Howl({
            src: [`${AUDIO_SERVER}/${song.uuid}`],
            html5: true,
            buffer: true,
            preload: true,
          }),
          song.id
        )
      );
      return <Song songId={song.id} key={song.id} />;
    });
    setSongItems(items);
    return () => {};
  }, []);
  return (
    <div className={classes.playlistContainer}>
      <div className={classes.playlistTable}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Artist</th>
              <th>Time</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{songItems}</tbody>
        </table>
      </div>
      {statePlayer.isPlaying ? <PlayerPanel /> : null}
    </div>
  );
};

export default Playlist;
