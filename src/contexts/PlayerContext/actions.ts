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

export type SongType = {
  artist: string;
  id: number;
  imageType: string;
  length: string;
  name: string;
  type: string;
  uuid: string;
};

type SetPlaylistActionType = {
  type: typeof SET_PLAYLIST;
  data: Array<SongType>;
};
export const setPlaylist = (songs: Array<SongType>): SetPlaylistActionType => {
  return {
    type: SET_PLAYLIST,
    data: songs,
  };
};

type SetHowlActionType = {
  type: typeof SET_HOWL;
  howl: any;
  songId: number;
};
export const setHowl = (howl: any, songId: number): SetHowlActionType => {
  return {
    type: SET_HOWL,
    howl,
    songId,
  };
};

type SetRandomIndexActionType = {
  type: typeof SET_RANDOM_INDEX;
  data: number;
};
export const setRandomIndex = (songIndex: number): SetRandomIndexActionType => {
  return {
    type: SET_RANDOM_INDEX,
    data: songIndex,
  };
};

type SetVolumeActionType = {
  type: typeof SET_VOLUME;
  data: number;
};
export const setVolume = (volume: number): SetVolumeActionType => {
  return {
    type: SET_VOLUME,
    data: volume,
  };
};

type SetSeekPositionActioType = {
  type: typeof SET_SEEK_POSITION;
  data: number;
};
export const setSeekPosition = (
  seekPosition: number
): SetSeekPositionActioType => {
  return {
    type: SET_SEEK_POSITION,
    data: seekPosition,
  };
};

type SetCurrentSongActionType = {
  type: typeof SET_CURRENT_SONG;
  data: number;
};
export const setCurrentSong = (id: number): SetCurrentSongActionType => {
  return {
    type: SET_CURRENT_SONG,
    data: id,
  };
};

type ToggleRandomActionType = {
  type: typeof TOGGLE_RANDOM;
  data: boolean;
};
export const toggleRandom = (boolean: boolean): ToggleRandomActionType => {
  return {
    type: TOGGLE_RANDOM,
    data: boolean,
  };
};

type ToggleRepeatActionType = {
  type: typeof TOGGLE_REPEAT;
  data: boolean;
};
export const toggleRepeat = (boolean: boolean): ToggleRepeatActionType => {
  return {
    type: TOGGLE_REPEAT,
    data: boolean,
  };
};

type TogglePlayingActionType = {
  type: typeof TOGGLE_PLAYING;
  data: boolean;
};
export const togglePlaying = (boolean: boolean): TogglePlayingActionType => {
  return {
    type: TOGGLE_PLAYING,
    data: boolean,
  };
};

type TogglePausedActionType = {
  type: typeof TOGGLE_PAUSED;
  data: boolean;
};
export const togglePaused = (boolean: boolean): TogglePausedActionType => {
  return {
    type: TOGGLE_PAUSED,
    data: boolean,
  };
};

export type PlayerActionTypes =
  | SetPlaylistActionType
  | SetCurrentSongActionType
  | ToggleRandomActionType
  | ToggleRepeatActionType
  | TogglePlayingActionType
  | TogglePausedActionType
  | SetHowlActionType
  | SetSeekPositionActioType
  | SetRandomIndexActionType;
