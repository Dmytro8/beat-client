import React, { useState, useEffect, Fragment, useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthRoutes } from "../../routes/AuthRoutes";
import { ProfileRoutes } from "../../routes/ProfileRoutes";
import { AuthContext } from "../../contexts/AuthContext/authContext";
import { ACCESS_TOKEN } from "../../constants";
import { authAPI } from "../../api/authApi";
import {
  updateAuthentication,
  updateToken,
  updateAuthorizing,
} from "../../contexts/AuthContext/actions";
import {
  ProfileProvider,
  ProfileContext,
} from "../../contexts/ProfileContext/profileContext";
import { AppSpinner } from "../common/FormControls";
import { setProfile } from "../../contexts/ProfileContext/actions";

const App = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [stateAuth, dispatchAuth] = useContext(AuthContext);
  const [stateProfile, dispatchProfile] = useContext(ProfileContext);
  const isAuthenticated = !!localStorage.getItem(ACCESS_TOKEN);
  useEffect(() => {
    dispatchAuth(updateAuthentication(!!localStorage.getItem(ACCESS_TOKEN)));
    dispatchAuth(updateToken(localStorage.getItem(ACCESS_TOKEN)));
    if (isAuthenticated) {
      const fetchData = async () => {
        const user = await authAPI.getCurrentUser(
          localStorage.getItem(ACCESS_TOKEN)
        );
        console.log(user);
        dispatchProfile(setProfile(user));
        setIsAuthorized(true);
        dispatchAuth(updateAuthorizing(false));
        // loginSocketEmit(userId);
      };
      fetchData();
    }
    return () => {
      setIsAuthorized(false);
    };
  }, [isAuthenticated, dispatchProfile, dispatchAuth]);
  return (
    <Router>
      {isAuthenticated ? (
        <Fragment>{isAuthorized ? <ProfileRoutes /> : <AppSpinner />}</Fragment>
      ) : (
        <AuthRoutes />
      )}
    </Router>
  );
};

export default App;