export const UPDATE_TOKEN = "UPDATE_TOKEN";
export const UPDATE_AUTHENTICATION = "UPDATE_AUTHENTICATION";
export const UPDATE_AUTHORIZING = "UPDATE_AUTHORIZING";
export const UPDATE_ERROR_STATUS = "UPDATE_ERROR_STATUS";

export type AuthProviderPropsType = { children: React.ReactNode };

export type AuthStateType = {
  token: null | string;
  isAuthenticated: boolean;
  isAuthorizing: boolean;
  isError: boolean;
};

export type AuthContextType = {
  state: AuthStateType;
  dispatch: ({ type }: { type: string }) => void;
};
