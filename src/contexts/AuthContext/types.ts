export const UPDATE_TOKEN = "UPDATE_TOKEN";
export const UPDATE_AUTHENTICATION = "UPDATE_AUTHENTICATION";
export const UPDATE_AUTHORIZING = "UPDATE_AUTHORIZING";

export type AuthProviderPropsType = { children: React.ReactNode };

export type AuthStateType = {
  token: null | string;
  isAuthenticated: boolean;
  isAuthorizing: boolean;
};

export type AuthContextType = {
  state: AuthStateType;
  dispatch: ({ type }: { type: string }) => void;
};
