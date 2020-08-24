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
  updateErrorStatus,
} from "../../contexts/AuthContext/actions";
import { ProfileContext } from "../../contexts/ProfileContext/ProfileContext";
import { AppSpinner } from "../common/FormControls";
import {
  setProfile,
  setFavouriteSongs,
} from "../../contexts/ProfileContext/actions";
import { PlayerContext } from "../../contexts/PlayerContext/PlayerContext";
import { musicAPI } from "../../api/musicAPI";

const App = () => {
  const [authState, authDispatch] = useContext(AuthContext);
  const [stateProfile, dispatchProfile] = useContext(ProfileContext);
  const [statePlayer, dispatchPlayer] = useContext(PlayerContext);
  // let history = useHistory();
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
      const fetchFavoriteSongs = async () => {
        let response = await musicAPI.getFavourites(
          String(localStorage.getItem(ACCESS_TOKEN))
        );
        let favouriteSongsId = response.map((song) => song.audio.id);
        dispatchProfile(setFavouriteSongs(favouriteSongsId));
      };
      fetchFavoriteSongs();
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
