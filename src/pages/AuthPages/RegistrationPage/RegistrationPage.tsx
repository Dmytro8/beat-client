import React from "react";
import { AuthPaper } from "../AuthPaper";
import { FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from "../../../constants";
import { LOGIN } from "../../../constants/route.urls";
import { NavLink } from "react-router-dom";
import classes from "./RegistrationPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { RegistrationForm } from "../../../components/Forms/RegistrationForm";

const RegistrationPage = () => {
  return (
    <AuthPaper title="Sign up">
      <RegistrationForm />
      <div className={classes.socialSignup}>
        <p>Or sign up using</p>
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
      <div className={classes.login}>
        <p>
          Already a member?
          <NavLink to={LOGIN}>Sign in now</NavLink>
        </p>
      </div>
    </AuthPaper>
  );
};

export default RegistrationPage;
