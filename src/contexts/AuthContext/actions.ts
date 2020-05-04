import {
  UPDATE_AUTHENTICATION,
  UPDATE_TOKEN,
  UPDATE_AUTHORIZING,
} from "./types";

export type UpdateAuthenticationActionType = {
  type: typeof UPDATE_AUTHENTICATION;
  isAuthenticated: boolean;
};
export const updateAuthentication = (
  isAuthenticated: boolean
): UpdateAuthenticationActionType => {
  return {
    type: UPDATE_AUTHENTICATION,
    isAuthenticated,
  };
};

export type UpdateAuthorizingActionType = {
  type: typeof UPDATE_AUTHORIZING;
  isAuthorizing: boolean;
};
export const updateAuthorizing = (
  isAuthorizing: boolean
): UpdateAuthorizingActionType => {
  return {
    type: UPDATE_AUTHORIZING,
    isAuthorizing,
  };
};

export type UpdateTokenActionType = {
  type: typeof UPDATE_TOKEN;
  token: string | null;
};
export const updateToken = (token: string | null): UpdateTokenActionType => {
  return {
    type: UPDATE_TOKEN,
    token,
  };
};

export type AuthActionTypes =
  | UpdateTokenActionType
  | UpdateAuthenticationActionType
  | UpdateAuthorizingActionType;
