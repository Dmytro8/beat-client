import React, { useContext, useEffect, useState, FC } from "react";
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
import { makeStyles } from "@material-ui/core/styles";

import { SongType } from "../../contexts/PlayerContext/types";
import { ProfileContext } from "../../contexts/ProfileContext/ProfileContext";

const useStyles = makeStyles({
  root: {
    "& .MuiPaper-root": {
      background: "linear-gradient(180deg, transparent, #252525 50%)",
    },
  },
});

const playlistMotionVariants = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", delay: 0.2 },
  },
  exit: {
    y: 100,
    opacity: 0,
  },
};

type PlaylistTypeProps = {
  isFavourites?: boolean;
};

const Playlist: FC<PlaylistTypeProps> = ({ isFavourites }) => {
  const muiclasses = useStyles();

  const [statePlayer, dispatchPlayer]: any = useContext(PlayerContext);
  const [stateProfile, dispatchProfile]: any = useContext(ProfileContext);
  const [songItems, setSongItems] = useState(null);
  const [isSongDrawerOpen, setIsSongDrawerOpen] = useState(false);
  const [drawerSong, setDrawerSong] = useState<SongType | null>(null);
  useEffect(() => {
    if (isFavourites) {
      const favouriteSongs = statePlayer.songs
        .filter(
          (song: SongType) =>
            stateProfile.favouriteSongs.indexOf(song.id) !== -1
        )
        .map((song: SongType) => {
          dispatchPlayer(
            setHowl(
              new Howl({
                src: [`${AUDIO_SERVER}/${song.uuid}`],
                html5: true,
                preload: true,
                // xhr: {
                //   headers: {
                //     // Authorization: "Bearer:" + 0,
                //     "Accept-Ranges": "bytes",
                //     Range: "bytes 0-200000",
                //     // "Content-Range": "bytes=0-100/9777108",
                //     // Range: "bytes 0-100",
                //   },
                //   withCredentials: true,
                // },
              }),
              song.id
            )
          );
          return (
            <Song songId={song.id} key={song.id} toggleDrawer={toggleDrawer} />
          );
        });
      setSongItems(favouriteSongs);
    } else {
      const allItems = statePlayer.songs.map((song: SongType) => {
        dispatchPlayer(
          setHowl(
            new Howl({
              src: [`${AUDIO_SERVER}/${song.uuid}`],
              html5: true,
              preload: true,
              // xhr: {
              //   headers: {
              //     // Authorization: "Bearer:" + 0,
              //     "Accept-Ranges": "bytes",
              //     Range: "bytes 0-200000",
              //     // "Content-Range": "bytes=0-100/9777108",
              //     // Range: "bytes 0-100",
              //   },
              //   withCredentials: true,
              // },
            }),
            song.id
          )
        );
        return (
          <Song songId={song.id} key={song.id} toggleDrawer={toggleDrawer} />
        );
      });
      setSongItems(allItems);
    }
    return () => {};
  }, []);

  const toggleDrawer = (open: boolean, song: SongType | null) => (
    event: any
  ) => {
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
              {/* <th className={classes.playlistTable__artist}>Artist</th> */}
              <th className={classes.playlistTable__time}>Time</th>
              <th className={classes.playlistTable__addToFavourite}></th>
              <th className={classes.playlistTable__price}>Price</th>
            </tr>
          </thead>
          <tbody>{songItems}</tbody>
        </table>
      </div>
      {statePlayer.isPlaying && !isFavourites ? (
        <PlayerPanel isFavourites={isFavourites} />
      ) : null}
      <SwipeableDrawer
        anchor={"bottom"}
        open={isSongDrawerOpen}
        onClose={toggleDrawer(false, null)}
        onOpen={toggleDrawer(true, null)}
        className={muiclasses.root}
      >
        <PlayerDrawer drawerSong={drawerSong} />
      </SwipeableDrawer>
    </motion.div>
  );
};

export default Playlist;
