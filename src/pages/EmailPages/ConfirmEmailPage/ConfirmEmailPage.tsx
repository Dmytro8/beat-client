import React from "react";

import classes from "./ConfirmEmailPage.module.scss";

//icons
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

export const ConfirmEmailPage = () => {
  return (
    <div className={classes.confirmEmailPage}>
      <div className={classes.container}>
        <section className={classes.icon}>
          <MailOutlineIcon className={classes.mailIcon} />
          <CheckCircleOutlineIcon className={classes.doneIcon} />
        </section>
        <section className={classes.greetingText}>
          <h2>Great! You've successfully signed up for Beat.</h2>
          <p>
            We've sent you a link to confirm your email address. Please check
            your inbox. It could take up to 20 minutes to show up in your inbox.
          </p>
        </section>
      </div>
    </div>
  );
};
