import React from "react";
import { Paper } from "@material-ui/core";
import classes from "./LoginPage.module.scss";
import { LoginForm } from "../../../components/Forms/LoginForm";
import { NavLink } from "react-router-dom";
import { REGISTRATION } from "../../../constants/route.urls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from "../../../constants/index";
import { AuthPaper } from "../AuthPaper";
// import { } from '@fortawesome/free-solid-svg-icons'

const LoginPage = () => {
  return (
    <AuthPaper title="Login">
      <LoginForm />
      <div className={classes.socialLogin}>
        <p>Or login using</p>
        <div className={classes.socialIcons}>
          <a href={FACEBOOK_AUTH_URL}>
            <FontAwesomeIcon
              icon={faFacebookF}
              className={classes.facebookIcon}
            />
          </a>
          <a href={GOOGLE_AUTH_URL}>
            <FontAwesomeIcon icon={faGoogle} className={classes.googleIcon} />
          </a>
        </div>
      </div>
      <div className={classes.signup}>
        <p>
          Not a member?
          <NavLink to={REGISTRATION}>Sign up now</NavLink>
        </p>
      </div>
    </AuthPaper>
  );
};

export default LoginPage;
