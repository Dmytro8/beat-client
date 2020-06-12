import React, { useContext } from "react";
import { ProfileContext } from "../../contexts/ProfileContext/ProfileContext";
import { PlayerContext } from "../../contexts/PlayerContext/PlayerContext";
import { SongType } from "../../contexts/PlayerContext/actions";

import classes from "./BasketPage.module.scss";
import { SongCard } from "../../components/SongCard";

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

  const renderBasket = () => {
    const basketSongs = getBasketSongs();
    if (basketSongs.length === 0) {
      return (
        <div className={classes.emptyBasket}>
          <p>Your basket is empty</p>
        </div>
      );
    } else
      return (
        <div className={classes.items}>
          {basketSongs.map((song: SongType) => {
            return <SongCard song={song} />;
          })}
        </div>
      );
  };

  return (
    <div className={classes.basket}>
      <div className={classes.basketItems}>{renderBasket()}</div>
      <div className={classes.basketPayment}></div>
    </div>
  );
};

export default BasketPage;
