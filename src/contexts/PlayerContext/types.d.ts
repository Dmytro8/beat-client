import {
  SET_PLAYLIST,
  SET_HOWL,
  SET_RANDOM_INDEX,
  SET_VOLUME,
  SET_SEEK_POSITION,
  SET_CURRENT_SONG,
  TOGGLE_RANDOM,
  TOGGLE_REPEAT,
  TOGGLE_PLAYING,
  TOGGLE_PAUSED,
  TOOGLE_LOADING,
} from "./actions";

export type PlayerProviderPropsType = { children: React.ReactNode };

export type SongType = {
  artist: string;
  id: number;
  imageType: string;
  length: string;
  name: string;
  type: string;
  uuid: string;
  howl: {
    play(): any;
    pause(): any;
  };
};

export type PlayerStateType = {
  currentSong: any;
  songs: any;
  isRepeat: boolean;
  isRandom: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  isLoading: boolean;
  volume: number;
  isMuted: boolean;
  randomIndex: number;
  seekPosition: number;
};

export type PlayerContextType = {
  state: PlayerStateType;
  dispatch: ({ type }: { type: string }) => void;
};

// Action types
export type SetPlaylistActionType = {
  type: typeof SET_PLAYLIST;
  data: Array<SongType>;
};

export type SetHowlActionType = {
  type: typeof SET_HOWL;
  howl: any;
  songId: number;
};

export type SetRandomIndexActionType = {
  type: typeof SET_RANDOM_INDEX;
  data: number;
};

export type SetVolumeActionType = {
  type: typeof SET_VOLUME;
  data: number;
};

export type SetSeekPositionActioType = {
  type: typeof SET_SEEK_POSITION;
  data: number;
};

export type SetCurrentSongActionType = {
  type: typeof SET_CURRENT_SONG;
  data: number;
};

export type ToggleRandomActionType = {
  type: typeof TOGGLE_RANDOM;
  data: boolean;
};

export type ToggleRepeatActionType = {
  type: typeof TOGGLE_REPEAT;
  data: boolean;
};

export type TogglePlayingActionType = {
  type: typeof TOGGLE_PLAYING;
  data: boolean;
};

export type TogglePausedActionType = {
  type: typeof TOGGLE_PAUSED;
  data: boolean;
};

export type ToggleLoadingActionType = {
  type: typeof TOOGLE_LOADING;
  data: boolean;
};

export type PlayerActionTypes =
  | SetPlaylistActionType
  | SetCurrentSongActionType
  | ToggleRandomActionType
  | ToggleRepeatActionType
  | TogglePlayingActionType
  | TogglePausedActionType
  | ToggleLoadingActionType
  | SetVolumeActionType
  | SetHowlActionType
  | SetSeekPositionActioType
  | SetRandomIndexActionType;
