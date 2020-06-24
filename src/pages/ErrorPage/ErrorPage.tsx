import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { HOME } from "../../constants/route.urls";
import MoodBadIcon from "@material-ui/icons/MoodBad";

import classes from "./ErrorPage.module.scss";

export const ErrorPage = () => {
  const [authState, authDispatch]: any = useContext(AuthContext);
  if (!authState.isError) return <Redirect to={HOME} />;
  return (
    <section className={classes.error}>
      <div className={classes.moodBadIcon}>
        <MoodBadIcon />
      </div>
      <div className={classes.error__description}>
        <header>
          <h1>500</h1>
          <h2>Server error</h2>
        </header>
        <div className={classes.refresh}>
          <p>Oops, something went wrong.</p>
          <p>Try to refresh this page.</p>
        </div>
      </div>
    </section>
  );
};
