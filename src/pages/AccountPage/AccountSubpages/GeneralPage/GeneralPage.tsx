import React, { useContext } from "react";

import classes from "./GeneralPage.module.scss";
import { AuthContext } from "../../../../contexts/AuthContext/AuthContext";
import { useHistory } from "react-router-dom";
import {
  updateAuthentication,
  updateToken,
} from "../../../../contexts/AuthContext/actions";
import { HOME } from "../../../../constants/route.urls";
import { ACCESS_TOKEN } from "../../../../constants";
import { AccountHeader } from "../../common/AccountHeader";

export const GeneralPage = () => {
  const [authState, authDispatch]: any = useContext(AuthContext);
  let history = useHistory();
  const logoutHandler = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    authDispatch(updateAuthentication(false));
    authDispatch(updateToken(null));
    history.replace(HOME);
  };
  return (
    <div className={classes.general}>
      <AccountHeader title={"General subpage"} />
      <section className={classes.logout}>
        <button onClick={logoutHandler} className={classes.logout__button}>
          Log out
        </button>
      </section>
    </div>
  );
};
