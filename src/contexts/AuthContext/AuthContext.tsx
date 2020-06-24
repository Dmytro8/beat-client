import { AuthActionTypes } from "./actions";
import React, { useReducer, createContext, ReactNode, FC } from "react";
import {
  UPDATE_TOKEN,
  UPDATE_AUTHENTICATION,
  UPDATE_AUTHORIZING,
  AuthProviderPropsType,
  AuthStateType,
  UPDATE_ERROR_STATUS,
} from "./types";

let initialState = {
  token: null,
  isAuthenticated: false,
  isAuthorizing: false,
  isError: false,
};

export const AuthContext = createContext({});

const authReducer = (
  state: AuthStateType = initialState,
  action: AuthActionTypes
) => {
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
    case UPDATE_ERROR_STATUS: {
      return { ...state, isError: action.isError };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};

export const AuthProvider: FC<AuthProviderPropsType> = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={[authState, authDispatch]}>
      {children}
    </AuthContext.Provider>
  );
};
