import React, { useReducer, createContext } from "react";
import { SET_PROFILE } from "./types";

let initialState = {
  profile: {
    username: "",
    email: "",
  },
};

export const ProfileContext = createContext();

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE: {
      return { ...state, token: action.token };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};

export const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  return (
    <ProfileContext.Provider value={[state, dispatch]}>
      {children}
    </ProfileContext.Provider>
  );
};
