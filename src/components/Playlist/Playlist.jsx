import React, { useContext, useEffect, useState } from "react";
import { Song } from "./Song";
import { PlayerContext } from "../../contexts/PlayerContext/PlayerContext";
import { Howl, Howler } from "howler";

import classes from "./Playlist.module.scss";
import { AUDIO_SERVER } from "../../constants";

import { setHowl } from "../../contexts/PlayerContext/actions";
import { PlayerPanel } from "./PlayerPanel";
import { motion } from "framer-motion";
import { PlayerDrawer } from "./PlayerDrawer";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

const playlistMotionVariants = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", delay: 0.2 },
  },
  exit: {
    x: -100,
    opacity: 0,
    transition: { type: "spring", delay: 0.2 },
  },
};

const Playlist = () => {
  const [statePlayer, dispatchPlayer] = useContext(PlayerContext);
  const [songItems, setSongItems] = useState(null);
  const [isSongDrawerOpen, setIsSongDrawerOpen] = useState(false);
  const [drawerSong, setDrawerSong] = useState({});
  useEffect(() => {
    console.log(statePlayer);
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
      return (
        <Song songId={song.id} key={song.id} toggleDrawer={toggleDrawer} />
      );
    });
    setSongItems(items);
    return () => {};
  }, []);

  const toggleDrawer = (open, song) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerSong(song);
    setIsSongDrawerOpen(open);
  };

  return (
    <motion.div
      variants={playlistMotionVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={classes.playlistContainer}
    >
      <div className={classes.playlistTable}>
        <table>
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
          <tbody>{songItems}</tbody>
        </table>
      </div>
      {statePlayer.isPlaying ? <PlayerPanel /> : null}
      <SwipeableDrawer
        anchor={"bottom"}
        open={isSongDrawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <PlayerDrawer drawerSong={drawerSong} />
      </SwipeableDrawer>
    </motion.div>
  );
};

export default Playlist;
