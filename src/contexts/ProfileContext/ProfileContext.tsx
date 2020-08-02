import React, { useReducer, createContext, FC } from "react";
import {
  SET_PROFILE,
  ADD_SONG_TO_BASKET,
  ADD_SONG_TO_FAVOURITE,
  REMOVE_SONG_FROM_FAVOURITE,
  REMOVE_SONG_FROM_BASKET,
  ProfileProviderPropsType,
  ProfileStateType,
} from "./types";
import { ProfileActionTypes } from "./actions";

let initialState = {
  profile: {
    username: "",
    email: "",
  },
  favouriteSongs: [],
  basket: [],
};

export const ProfileContext = createContext({});

const profileReducer = (
  state: ProfileStateType = initialState,
  action: ProfileActionTypes
) => {
  switch (action.type) {
    case SET_PROFILE: {
      return { ...state, profile: action.profile };
    }
    case ADD_SONG_TO_FAVOURITE: {
      return {
        ...state,
        favouriteSongs: [...state.favouriteSongs, action.songId],
      };
    }
    case REMOVE_SONG_FROM_FAVOURITE: {
      return {
        ...state,
        favouriteSongs: state.favouriteSongs.filter(
          (songId) => songId !== action.songId
        ),
      };
    }
    case ADD_SONG_TO_BASKET: {
      return {
        ...state,
        basket: [...state.basket, action.songId],
      };
    }
    case REMOVE_SONG_FROM_BASKET: {
      return {
        ...state,
        basket: state.basket.filter((songId) => songId !== action.songId),
      };
    }
    default: {
      return state;
    }
  }
};

export const ProfileProvider: FC<ProfileProviderPropsType> = ({ children }) => {
  const [profileState, profileDispatch] = useReducer(
    profileReducer,
    initialState
  );
  return (
    <ProfileContext.Provider value={[profileState, profileDispatch]}>
      {children}
    </ProfileContext.Provider>
  );
};
