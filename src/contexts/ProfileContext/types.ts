import { SongType } from "../PlayerContext/types";

export const SET_PROFILE = "SET_PROFILE";
export const ADD_SONG_TO_FAVOURITE = "ADD_SONG_TO_FAVOURITE";
export const REMOVE_SONG_FROM_FAVOURITE = "REMOVE_SONG_FROM_FAVOURITE";

export const ADD_SONG_TO_BASKET = "ADD_SONG_TO_BASKET";
export const REMOVE_SONG_FROM_BASKET = "REMOVE_SONG_FROM_BASKET";

export type ProfileProviderPropsType = { children: React.ReactNode };

export type ProfileType = {
  username: string;
  email: string;
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
