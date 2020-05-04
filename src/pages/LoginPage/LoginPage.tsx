import React, { Fragment } from "react";
import { Paper } from "@material-ui/core";
import classes from "./LoginPage.module.scss";
import { LoginForm } from "../../components/Forms/LoginForm";
import { NavLink } from "react-router-dom";
import { REGISTRATION } from "../../constants/route.urls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
// import { } from '@fortawesome/free-solid-svg-icons'

const LoginPage = () => {
  return (
    <Fragment>
      <div className={classes.wrapper}>
        <Paper elevation={0} className={classes.paper}>
          <LoginForm />
          <div className={classes.login}>
            <p>Or login using</p>
            <div className={classes.socialIcons}>
              <FontAwesomeIcon
                icon={faFacebookF}
                className={classes.facebookIcon}
              />
              <FontAwesomeIcon icon={faGoogle} className={classes.googleIcon} />
            </div>
          </div>
          <div className={classes.signup}>
            <p>
              Not a member?
              <NavLink to={REGISTRATION}>Sign up now</NavLink>
            </p>
          </div>
        </Paper>
      </div>
    </Fragment>
  );
};

export default LoginPage;
