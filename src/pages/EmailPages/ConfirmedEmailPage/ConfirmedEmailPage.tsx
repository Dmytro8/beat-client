import React from "react";
import { Link } from "react-router-dom";

import classes from "./ConfirmedEmailPage.module.scss";

//icons
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import Button from "@material-ui/core/Button";
import { HOME } from "../../../constants/route.urls";

export const ConfirmedEmailPage = () => {
  return (
    <div className={classes.confirmedEmailPage}>
      <div className={classes.container}>
        <section className={classes.icon}>
          <CheckCircleOutlineIcon className={classes.doneIcon} />
        </section>
        <section className={classes.greeting}>
          <h2>Email address confirmed</h2>
          <p>You have successfully confirmed your email address.</p>
          <Link to={HOME}>
            <Button>Go to Homepage</Button>
          </Link>
        </section>
      </div>
    </div>
  );
};
