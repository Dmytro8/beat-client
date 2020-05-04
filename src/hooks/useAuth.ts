import { ACCESS_TOKEN } from "./../constants/index";
import { useState, useCallback, useEffect } from "react";

export const useAuth = () => {
  const [token, setToken] = useState(null);

  const login = useCallback((accessToken) => {
    setToken(accessToken);
    localStorage.setItem(ACCESS_TOKEN, accessToken);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem(ACCESS_TOKEN);
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      login(accessToken);
    }
    return () => {};
  }, [login]);

  return { login, logout, token };
};
