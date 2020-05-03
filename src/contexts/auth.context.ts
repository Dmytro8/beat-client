import React, { useReducer, createContext } from "react";

const initState = {
  token: null,
  userId: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
};

// Create Context Object
export const AuthContext = createContext(initState);
