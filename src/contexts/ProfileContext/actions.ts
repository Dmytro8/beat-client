import {
  ProfileType,
  SetProfileActionType,
  AddSongToFavouriteActionType,
  RemoveSongFromFavouriteActionType,
  AddSongToBasketActionType,
  RemoveSongFromBasketActionType,
  SetFavouriteSongsActionType,
} from "./types";
export const SET_PROFILE = "SET_PROFILE";

export const SET_FAVOURITE_SONGS = "SET_FAVOURITE_SONGS";
export const ADD_SONG_TO_FAVOURITE = "ADD_SONG_TO_FAVOURITE";
export const REMOVE_SONG_FROM_FAVOURITE = "REMOVE_SONG_FROM_FAVOURITE";

export const ADD_SONG_TO_BASKET = "ADD_SONG_TO_BASKET";
export const REMOVE_SONG_FROM_BASKET = "REMOVE_SONG_FROM_BASKET";

export const setProfile = (profile: ProfileType): SetProfileActionType => {
  return {
    type: SET_PROFILE,
    profile,
  };
};

export const setFavouriteSongs = (
  songs: Array<any>
): SetFavouriteSongsActionType => {
  return {
    type: SET_FAVOURITE_SONGS,
    songs,
  };
};

export const addSongToFavourite = (
  songId: number
): AddSongToFavouriteActionType => {
  return {
    type: ADD_SONG_TO_FAVOURITE,
    songId,
  };
};

export const removeSongFromFavourite = (
  songId: number
): RemoveSongFromFavouriteActionType => {
  return {
    type: REMOVE_SONG_FROM_FAVOURITE,
    songId,
  };
};

export const addSongToBasket = (songId: number): AddSongToBasketActionType => {
  return {
    type: ADD_SONG_TO_BASKET,
    songId,
  };
};

export const removeSongFromBasket = (
  songId: number
): RemoveSongFromBasketActionType => {
  return {
    type: REMOVE_SONG_FROM_BASKET,
    songId,
  };
};
