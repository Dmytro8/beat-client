import {
  UPDATE_AUTHENTICATION,
  UPDATE_TOKEN,
  UPDATE_AUTHORIZING,
  UPDATE_ERROR_STATUS,
  UPDATE_MODAL_SIGN_STATUS,
} from "./types";

type UpdateAuthenticationActionType = {
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

type UpdateAuthorizingActionType = {
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

type UpdateTokenActionType = {
  type: typeof UPDATE_TOKEN;
  token: string | null;
};
export const updateToken = (token: string | null): UpdateTokenActionType => {
  return {
    type: UPDATE_TOKEN,
    token,
  };
};

type UpdateErrorStatusActionType = {
  type: typeof UPDATE_ERROR_STATUS;
  isError: boolean;
};
export const updateErrorStatus = (
  isError: boolean
): UpdateErrorStatusActionType => {
  return {
    type: UPDATE_ERROR_STATUS,
    isError,
  };
};

type UpdateModalSignStatus = {
  type: typeof UPDATE_MODAL_SIGN_STATUS;
  isModalSignOpen: boolean;
};
export const updateModalSignStatus = (
  isModalSignOpen: boolean
): UpdateModalSignStatus => {
  return {
    type: UPDATE_MODAL_SIGN_STATUS,
    isModalSignOpen,
  };
};

export type AuthActionTypes =
  | UpdateTokenActionType
  | UpdateAuthenticationActionType
  | UpdateAuthorizingActionType
  | UpdateErrorStatusActionType
  | UpdateModalSignStatus;
