import React, { useContext, useEffect } from "react";

import classes from "./HomePage.module.scss";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { ProfileContext } from "../../contexts/ProfileContext/ProfileContext";

const HomePage = () => {
  const [authState, authDispatch]: any = useContext(AuthContext);
  const [profileState, profileDispatch]: any = useContext(ProfileContext);

  useEffect(() => {
    return () => {};
  }, [profileState]);

  return (
    <div className={classes.homePage}>
      <h1>Home page</h1>
      {authState.isAuthenticated ? (
        <div>
          <h3>Username - {profileState.profile.username}</h3>
          <h3>Email - {profileState.profile.email}</h3>
        </div>
      ) : (
        <h2>You are not logged in</h2>
      )}
    </div>
  );
};

export default HomePage;
