import React from "react";
import { Paper } from "@material-ui/core";
import classes from "./LoginPage.module.scss";
import { LoginForm } from "../../components/Forms/LoginForm";
import { NavLink } from "react-router-dom";
import { REGISTRATION } from "../../constants/url";

const LoginPage = () => {
  return (
    <div className={classes.wrapper}>
      <Paper elevation={0} className={classes.paper}>
        <LoginForm />
        <div className={classes.signup}>
          <p>
            Not a member?
            <NavLink to={REGISTRATION}>Sign up now</NavLink>
          </p>
        </div>
      </Paper>
    </div>
  );
};

export default LoginPage;
