import React, { useReducer, createContext } from "react";

import {
  SET_PLAYLIST,
  SET_CURRENT_SONG,
  TOGGLE_RANDOM,
  TOGGLE_REPEAT,
  TOGGLE_PLAYING,
  SET_HOWL,
  TOGGLE_PAUSED,
  SET_VOLUME,
  SET_SEEK_POSITION,
  SET_RANDOM_INDEX,
} from "./types";

let initialState = {
  currentSong: {},
  songs: [],
  isRepeat: false,
  isRandom: false,
  isPlaying: false,
  isPaused: false,
  volume: 50,
  isMuted: false,
  randomIndex: 0,
  seekPosition: 0.0,
};

export const PlayerContext = createContext();

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYLIST:
      return {
        ...state,
        songs: action.data,
      };
    case SET_HOWL:
      return {
        ...state,
        songs: state.songs.map((song) => {
          if (song.id === action.songId) {
            return {
              ...song,
              howl: action.howl,
            };
          }
          return song;
        }),
      };
    case SET_RANDOM_INDEX:
      return {
        ...state,
        randomIndex: action.data,
      };
    case SET_VOLUME: {
      return {
        ...state,
        volume: action.data,
      };
    }
    case SET_SEEK_POSITION:
      return {
        ...state,
        seekPosition: action.data,
      };
    case SET_CURRENT_SONG:
      return {
        ...state,
        currentSong: action.data,
        isPlaying: true,
      };
    case TOGGLE_RANDOM:
      return {
        ...state,
        isRandom: action.data,
      };
    case TOGGLE_REPEAT:
      return {
        ...state,
        isRepeat: action.data,
      };
    case TOGGLE_PLAYING:
      return {
        ...state,
        isPlaying: action.data,
      };
    case TOGGLE_PAUSED:
      return {
        ...state,
        isPaused: action.data,
      };
    default:
      return state;
  }
};

export const PlayerProvider = ({ children }) => {
  const [playerState, playerDispatch] = useReducer(playerReducer, initialState);
  return (
    <PlayerContext.Provider value={[playerState, playerDispatch]}>
      {children}
    </PlayerContext.Provider>
  );
};
