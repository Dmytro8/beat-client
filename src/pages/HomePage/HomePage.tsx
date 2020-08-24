import React, { useContext, useEffect, useState } from "react";

import classes from "./HomePage.module.scss";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { ProfileContext } from "../../contexts/ProfileContext/ProfileContext";
import { authAPI } from "../../api/authApi";
import { ACCESS_TOKEN } from "../../constants";
import { setProfile } from "../../contexts/ProfileContext/actions";
import { PlayerContext } from "../../contexts/PlayerContext/PlayerContext";
import { musicAPI } from "../../api/musicAPI";
import { setPlaylist } from "../../contexts/PlayerContext/actions";
import { updateErrorStatus } from "../../contexts/AuthContext/actions";
import { MusicBar } from "../../components/MusicBar";

const HomePage = () => {
  const [authState, authDispatch]: any = useContext(AuthContext);
  const [profileState, profileDispatch]: any = useContext(ProfileContext);

  useEffect(() => {
    return () => {};
  }, [profileState, authState]);

  return (
    <div className={classes.home}>
      <h1 className={classes.home__title}>Beat</h1>
      <h3 className={classes.home__text}>We speed up your heartbeat</h3>
      <MusicBar />
      {authState.isAuthenticated ? (
        <div>
          <h3>
            Username -{" "}
            {authState.isAuthorizing ? "..." : profileState.profile.username}
          </h3>
          <h3>
            Email -{" "}
            {authState.isAuthorizing ? "..." : profileState.profile.email}
          </h3>
        </div>
      ) : (
        <h2>You are not logged in</h2>
      )}
    </div>
  );
};

export default HomePage;
