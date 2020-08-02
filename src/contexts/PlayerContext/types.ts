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

export type PlayerProviderPropsType = { children: React.ReactNode };

export type SongType = {
  id: number;
  name: string;
  artist: string;
  uuid: number;
  length: string;
  imageType: string;
};

export type PlayerStateType = {
  currentSong: any;
  songs: any;
  isRepeat: boolean;
  isRandom: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  volume: number;
  isMuted: boolean;
  randomIndex: number;
  seekPosition: number;
};

export type PlayerContextType = {
  state: PlayerStateType;
  dispatch: ({ type }: { type: string }) => void;
};
