import {
  SET_PROFILE,
  ADD_SONG_TO_FAVOURITE,
  REMOVE_SONG_FROM_FAVOURITE,
  ADD_SONG_TO_BASKET,
  REMOVE_SONG_FROM_BASKET,
} from "./types";

type ProfileType = {
  email: string;
  username: string;
};

type SetProfileActionType = {
  type: typeof SET_PROFILE;
  profile: ProfileType;
};
export const setProfile = (profile: ProfileType): SetProfileActionType => {
  return {
    type: SET_PROFILE,
    profile,
  };
};

type AddSongToFavouriteActionType = {
  type: typeof ADD_SONG_TO_FAVOURITE;
  songId: number;
};
export const addSongToFavourite = (
  songId: number
): AddSongToFavouriteActionType => {
  return {
    type: ADD_SONG_TO_FAVOURITE,
    songId,
  };
};

type RemoveSongFromFavouriteActionType = {
  type: typeof REMOVE_SONG_FROM_FAVOURITE;
  songId: number;
};
export const removeSongFromFavourite = (
  songId: number
): RemoveSongFromFavouriteActionType => {
  return {
    type: REMOVE_SONG_FROM_FAVOURITE,
    songId,
  };
};

type AddSongToBasketActionType = {
  type: typeof ADD_SONG_TO_BASKET;
  songId: number;
};
export const addSongToBasket = (songId: number): AddSongToBasketActionType => {
  return {
    type: ADD_SONG_TO_BASKET,
    songId,
  };
};

type RemoveSongFromBasketActionType = {
  type: typeof REMOVE_SONG_FROM_BASKET;
  songId: number;
};
export const removeSongFromBasket = (
  songId: number
): RemoveSongFromBasketActionType => {
  return {
    type: REMOVE_SONG_FROM_BASKET,
    songId,
  };
};

export type ProfileActionTypes =
  | SetProfileActionType
  | AddSongToFavouriteActionType
  | RemoveSongFromFavouriteActionType
  | AddSongToBasketActionType
  | RemoveSongFromBasketActionType;
