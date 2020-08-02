import React from "react";
import { FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from "../../../constants";
import { NavLink } from "react-router-dom";
import classes from "./RegistrationPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { RegistrationForm } from "../../../components/Forms/RegistrationForm";

import singUpImage from "../../../static/images/signup-image.jpg";

const RegistrationPage = () => {
  return (
    <section className={classes.registration}>
      <div className={classes.singUpFormContainer}>
        <h1>Sign Up</h1>
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
      </div>
      <div className={classes.signUpImage}>
        <img src={singUpImage} alt="neon trend" />
      </div>
    </section>
  );
};

export default RegistrationPage;
