import React, { useContext, useState, useEffect } from "react";
import { ProfileContext } from "../../contexts/ProfileContext/ProfileContext";
import { PlayerContext } from "../../contexts/PlayerContext/PlayerContext";
import { SongType } from "../../contexts/PlayerContext/actions";

import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import { LazyLoadImage } from "react-lazy-load-image-component";

import classes from "./BasketPage.module.scss";
import { SongCard } from "../../components/SongCard";
import { AUDIO_IMAGE_SERVER } from "../../constants";
import { blueGrey } from "@material-ui/core/colors";
import { removeSongFromBasket } from "../../contexts/ProfileContext/actions";

const BasketPage = () => {
  const [profileState, profileDispatch]: any = useContext(ProfileContext);
  const [playerState, playerDispatch]: any = useContext(PlayerContext);
  const [basketItems, setBasketItems]: any = useState([]);

  useEffect(() => {
    let basketSongs = playerState.songs.filter((song: SongType) => {
      if (profileState.basket.includes(song.id)) {
        return song;
      }
    });
    setBasketItems(basketSongs);
    return () => {};
  }, [profileState]);

  const renderBasket = () => {
    if (basketItems.length === 0) {
      return (
        <div className={classes.emptyBasket}>
          <p>Your basket is empty</p>
        </div>
      );
    } else
      return (
        <div className={classes.items}>
          {basketItems.map((song: SongType) => {
            return <SongCard song={song} />;
          })}
        </div>
      );
  };
  const renderSummaryItems = () => {
    if (basketItems.length === 0) {
      return (
        <div className={classes.emptyBasket}>
          <p>Your basket is empty</p>
        </div>
      );
    } else
      return (
        <div className={classes.purchaseWrapper}>
          {basketItems.map((song: SongType) => {
            return (
              <div className={classes.purchaseItem}>
                <div className={classes.purchaseItemBg}>
                  <LazyLoadImage
                    alt={song.name}
                    effect="blur"
                    src={`${AUDIO_IMAGE_SERVER}/200x200/${song.uuid}`}
                    height={"100%"}
                  />
                </div>
                <div className={classes.purchaseItemDescr}>
                  <div>
                    <p>{song.name}</p>
                    <p>{song.artist}</p>
                  </div>
                  <div>
                    <p>$27</p>
                  </div>
                  <div
                    onClick={() =>
                      profileDispatch(removeSongFromBasket(song.id))
                    }
                  >
                    <CloseIcon />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
  };

  return (
    <section className={classes.basket}>
      <div className={classes.basketItems}>{renderBasket()}</div>
      <div className={classes.basketPayment}>
        <div className={classes.basketPaymentHeader}>
          <h2>Summary</h2>
        </div>
        <div className={classes.basketPaymentItems}>{renderSummaryItems()}</div>
        <div className={classes.basketPaymentPay}>
          <div className={classes.total}>
            <h2>Total</h2>
            <h4>$3443</h4>
          </div>
          <Button>Checkout</Button>
        </div>
      </div>
    </section>
  );
};

export default BasketPage;
