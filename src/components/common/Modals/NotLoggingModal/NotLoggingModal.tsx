import React, { FC } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

//icons
import CloseIcon from "@material-ui/icons/Close";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

import classes from "./NotLoggingModal.module.scss";
import { LoginForm } from "../../../Forms/LoginForm";
import { RegistrationForm } from "../../../Forms/RegistrationForm";

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
            </div>
            <div className={classes.separator}>
              <span>or</span>
            </div>
            <div className={classes.signUp}>
              <Button endIcon={<ArrowRightAltIcon />}>Sign Up</Button>
            </div>
          </div>
          <CloseIcon
            className={classes.closeModal}
            onClick={handleCloseModalSign}
          />
        </div>
      </Fade>
    </Modal>
  );
};
