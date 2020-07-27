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
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authState, authDispatch] = useContext(AuthContext);
  const [stateProfile, dispatchProfile] = useContext(ProfileContext);
  useEffect(() => {
    let isAuthenticated = !!localStorage.getItem(ACCESS_TOKEN);
    authDispatch(updateAuthentication(isAuthenticated));
    authDispatch(updateToken(localStorage.getItem(ACCESS_TOKEN)));
    if (isAuthenticated) {
      const fetchData = async () => {
        const user = await authAPI.getCurrentUser(
          localStorage.getItem(ACCESS_TOKEN)
        );
        dispatchProfile(setProfile(user));
        setIsAuthorized(true);
        authDispatch(updateAuthorizing(false));
        // loginSocketEmit(userId);
      };
      fetchData();
    }
    return () => {
      setIsAuthorized(false);
    };
  }, [dispatchProfile, authDispatch]);
  return (
    <Router>
      <MainRoutes />
    </Router>
  );
};

export default App;
