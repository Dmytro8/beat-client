export const UPDATE_TOKEN = "UPDATE_TOKEN";
export const UPDATE_AUTHENTICATION = "UPDATE_AUTHENTICATION";
export const UPDATE_AUTHORIZING = "UPDATE_AUTHORIZING";
export const UPDATE_ERROR_STATUS = "UPDATE_ERROR_STATUS";
export const UPDATE_MODAL_SIGN_STATUS = "UPDATE_MODAL_SIGN_STATUS";

export type AuthProviderPropsType = { children: React.ReactNode };

export type AuthStateType = {
  token: null | string;
  isAuthenticated: boolean;
  isAuthorizing: boolean;
  isError: boolean;
  isModalSignOpen: boolean;
};

export type AuthContextType = {
  state: AuthStateType;
  dispatch: ({ type }: { type: string }) => void;
};
