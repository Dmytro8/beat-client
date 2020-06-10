import React, { useContext } from "react";
import { ProfileContext } from "../../contexts/ProfileContext/ProfileContext";
import { PlayerContext } from "../../contexts/PlayerContext/PlayerContext";
import { SongType } from "../../contexts/PlayerContext/actions";

import classes from "./BasketPage.module.scss";

const BasketPage = () => {
  const [profileState, profileDispatch] = useContext(ProfileContext);
  const [playerState, playerDispatch] = useContext(PlayerContext);

  const getBasketSongs = () => {
    let basketSongs = playerState.songs.filter((song: SongType) => {
      if (profileState.basket.includes(song.id)) {
        return song;
      }
    });
    return basketSongs;
  };
  console.log(getBasketSongs());

  return (
    <div className={classes.basket}>
      <div className={classes.basketItems}></div>
      <div className={classes.basketPayment}></div>
    </div>
  );
};

export default BasketPage;
