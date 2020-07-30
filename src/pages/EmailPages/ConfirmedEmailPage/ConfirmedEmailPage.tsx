import React, { useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";

import classes from "./ConfirmedEmailPage.module.scss";

//icons
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import Button from "@material-ui/core/Button";
import { HOME, ERROR } from "../../../constants/route.urls";
import axios from "axios";
import qs from "qs";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import { useHistory } from "react-router";

import { updateErrorStatus } from "../../../contexts/AuthContext/actions";
import { authAPI } from "../../../api/authApi";

export const ConfirmedEmailPage = (props: any) => {
  const [authState, authDispatch]: any = useContext(AuthContext);
  const history = useHistory();
  useEffect(() => {
    let activationCode = qs.parse(props.location.search, {
      ignoreQueryPrefix: true,
    }).activationCode;
    if (activationCode) {
      authAPI.activateEmail(String(activationCode)).then((response) => {
        if (response.status !== 200) {
          authDispatch(updateErrorStatus(true));
          history.replace(ERROR);
        }
      });
    }
    return () => {};
  }, []);

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
