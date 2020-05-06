import { SET_PROFILE } from "./types";

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

export type ProfileActionTypes = SetProfileActionType;
