import {
  SongType,
  SetPlaylistActionType,
  SetHowlActionType,
  SetRandomIndexActionType,
  SetVolumeActionType,
  SetSeekPositionActioType,
  SetCurrentSongActionType,
  ToggleRandomActionType,
  ToggleRepeatActionType,
  TogglePlayingActionType,
  TogglePausedActionType,
  ToggleLoadingActionType,
} from "./types";
export const SET_PLAYLIST = "SET_PLAYLIST";
export const SET_HOWL = "SET_HOWL";
export const SET_VOLUME = "SET_VOLUME";
export const SET_SEEK_POSITION = "SET_SEEK_POSITION";
export const SET_CURRENT_SONG = "SET_CURRENT_SONG";
export const SET_RANDOM_INDEX = "SET_RANDOM_INDEX";
export const TOGGLE_RANDOM = "TOGGLE_RANDOM";
export const TOGGLE_REPEAT = "TOGGLE_OPTIONS";
export const TOGGLE_PLAYING = "TOGGLE_PLAYING";
export const TOGGLE_PAUSED = "TOGGLE_PAUSED";
export const TOOGLE_LOADING = "TOGGLE_LOADING";

export const setPlaylist = (songs: Array<SongType>): SetPlaylistActionType => {
  return {
    type: SET_PLAYLIST,
    data: songs,
  };
};

export const setHowl = (howl: any, songId: number): SetHowlActionType => {
  return {
    type: SET_HOWL,
    howl,
    songId,
  };
};

export const setRandomIndex = (songIndex: number): SetRandomIndexActionType => {
  return {
    type: SET_RANDOM_INDEX,
    data: songIndex,
  };
};

export const setVolume = (volume: number): SetVolumeActionType => {
  return {
    type: SET_VOLUME,
    data: volume,
  };
};

export const setSeekPosition = (
  seekPosition: number
): SetSeekPositionActioType => {
  return {
    type: SET_SEEK_POSITION,
    data: seekPosition,
  };
};

export const setCurrentSong = (id: number): SetCurrentSongActionType => {
  return {
    type: SET_CURRENT_SONG,
    data: id,
  };
};

export const toggleRandom = (boolean: boolean): ToggleRandomActionType => {
  return {
    type: TOGGLE_RANDOM,
    data: boolean,
  };
};

export const toggleRepeat = (boolean: boolean): ToggleRepeatActionType => {
  return {
    type: TOGGLE_REPEAT,
    data: boolean,
  };
};

export const togglePlaying = (boolean: boolean): TogglePlayingActionType => {
  return {
    type: TOGGLE_PLAYING,
    data: boolean,
  };
};

export const togglePaused = (boolean: boolean): TogglePausedActionType => {
  return {
    type: TOGGLE_PAUSED,
    data: boolean,
  };
};

export const toggleLoading = (boolean: boolean): ToggleLoadingActionType => {
  return {
    type: TOOGLE_LOADING,
    data: boolean,
  };
};
