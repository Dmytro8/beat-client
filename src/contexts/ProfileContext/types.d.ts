import {
  SET_PROFILE,
  ADD_SONG_TO_FAVOURITE,
  REMOVE_SONG_FROM_FAVOURITE,
  ADD_SONG_TO_BASKET,
  REMOVE_SONG_FROM_BASKET,
  SET_FAVOURITE_SONGS,
} from "./actions";
export type ProfileProviderPropsType = { children: React.ReactNode };

export type ProfileType = {
  email: string;
  username: string;
};

export type ProfileStateType = {
  profile: ProfileType;
  favouriteSongs: Array<number>;
  basket: Array<number>;
};

export type ProfileContextType = {
  state: ProfileStateType;
  dispatch: ({ type }: { type: string }) => void;
};

// Actions types
export type SetProfileActionType = {
  type: typeof SET_PROFILE;
  profile: ProfileType;
};

export type SetFavouriteSongsActionType = {
  type: typeof SET_FAVOURITE_SONGS;
  songs: Array<any>;
};

export type AddSongToFavouriteActionType = {
  type: typeof ADD_SONG_TO_FAVOURITE;
  songId: number;
};

export type RemoveSongFromFavouriteActionType = {
  type: typeof REMOVE_SONG_FROM_FAVOURITE;
  songId: number;
};

export type AddSongToBasketActionType = {
  type: typeof ADD_SONG_TO_BASKET;
  songId: number;
};

export type RemoveSongFromBasketActionType = {
  type: typeof REMOVE_SONG_FROM_BASKET;
  songId: number;
};

export type ProfileActionTypes =
  | SetProfileActionType
  | SetFavouriteSongsActionType
  | AddSongToFavouriteActionType
  | RemoveSongFromFavouriteActionType
  | AddSongToBasketActionType
  | RemoveSongFromBasketActionType;
