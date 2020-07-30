import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { updateErrorStatus } from "../../contexts/AuthContext/actions";
import { HOME } from "../../constants/route.urls";
import MoodBadIcon from "@material-ui/icons/MoodBad";

import classes from "./ErrorPage.module.scss";

export const ErrorPage = () => {
  const [authState, authDispatch]: any = useContext(AuthContext);

  useEffect(() => {
    return () => {
      authDispatch(updateErrorStatus(false));
    };
  }, [authState]);
  if (!authState.isError) return <Redirect to={HOME} />;
  return (
    <section className={classes.error}>
      <div className={classes.moodBadIcon}>
        <MoodBadIcon />
      </div>
      <div className={classes.error__description}>
        <header>
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
