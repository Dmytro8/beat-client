import React, { useReducer, createContext } from "react";
import { SET_PROFILE } from "./types";

let initialState = {
  profile: {
    username: "",
    email: "",
  },
  favouriteSongs: [],
};

export const ProfileContext = createContext();

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE: {
      return { ...state, profile: action.profile };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};

export const ProfileProvider = ({ children }) => {
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
