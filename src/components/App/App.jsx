import React, { useState, useEffect, Fragment, useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { MainRoutes } from "../../routes/MainRoutes";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { ACCESS_TOKEN } from "../../constants";
import { authAPI } from "../../api/authApi";
import {
  updateAuthentication,
  updateToken,
  updateAuthorizing,
} from "../../contexts/AuthContext/actions";
import { ProfileContext } from "../../contexts/ProfileContext/ProfileContext";
import { AppSpinner } from "../common/FormControls";
import { setProfile } from "../../contexts/ProfileContext/actions";

const App = () => {
  const [authState, authDispatch] = useContext(AuthContext);
  const [stateProfile, dispatchProfile] = useContext(ProfileContext);
  useEffect(() => {
    let isAuthenticated = !!localStorage.getItem(ACCESS_TOKEN);
    authDispatch(updateAuthentication(isAuthenticated));
    authDispatch(updateToken(localStorage.getItem(ACCESS_TOKEN)));
    if (isAuthenticated) {
      const fetchData = async () => {
        authDispatch(updateAuthorizing(true));
        const user = await authAPI.getCurrentUser(
          localStorage.getItem(ACCESS_TOKEN)
        );
        dispatchProfile(setProfile(user));
        authDispatch(updateAuthorizing(false));
        // loginSocketEmit(userId);
      };
      fetchData();
    }
    return () => {};
  }, [localStorage.getItem(ACCESS_TOKEN)]);
  return (
    <Router>
      <MainRoutes />
    </Router>
  );
};

export default App;
