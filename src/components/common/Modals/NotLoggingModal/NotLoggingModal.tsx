import React, { FC } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

//icons
import CloseIcon from "@material-ui/icons/Close";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import {
  FACEBOOK_AUTH_URL,
  GOOGLE_AUTH_URL,
} from "../../../../constants/index";

import classes from "./NotLoggingModal.module.scss";
import { LoginForm } from "../../../Forms/LoginForm";

import musicWave from "../../../../static/images/musicWave.png";
import { REGISTRATION } from "../../../../constants/route.urls";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

type ModalSignPropsType = {
  open: boolean;
  handleCloseModalSign: () => void;
};

export const NotLoggingModal: FC<ModalSignPropsType> = ({
  open,
  handleCloseModalSign,
}) => {
  const materialClasses = useStyles();

  return (
    <Modal
      open={open}
      onClose={handleCloseModalSign}
      className={materialClasses.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 100,
      }}
    >
      <Fade in={open}>
        <div className={classes.modal}>
          <h2>You are not logged in!</h2>
          <div className={classes.options}>
            <div className={classes.loginForm}>
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
                    <FontAwesomeIcon
                      icon={faGoogle}
                      className={classes.googleIcon}
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className={classes.separator}>
              <span>or</span>
            </div>
            <div className={classes.signUp}>
              <Link to={REGISTRATION} onClick={handleCloseModalSign}>
                <Button endIcon={<ArrowRightAltIcon />}>Sign Up</Button>
              </Link>
            </div>
          </div>
          <CloseIcon
            className={classes.closeModal}
            onClick={handleCloseModalSign}
          />
          <div className={classes.curvedShape}>
            <img src={musicWave} alt="music wave" />
          </div>
        </div>
      </Fade>
    </Modal>
  );
};
