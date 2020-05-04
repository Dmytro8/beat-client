import React, { useReducer, createContext } from "react";
import {
  UPDATE_TOKEN,
  UPDATE_AUTHENTICATION,
  UPDATE_AUTHORIZING,
} from "./types";

let initialState = {
  token: null,
  isAuthenticated: false,
  isAuthorizing: false,
};

export const AuthContext = createContext();

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TOKEN: {
      return { ...state, token: action.token };
    }
    case UPDATE_AUTHENTICATION: {
      return { ...state, isAuthenticated: action.isAuthenticated };
    }
    case UPDATE_AUTHORIZING: {
      return { ...state, isAuthorizing: action.isAuthorizing };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
};
