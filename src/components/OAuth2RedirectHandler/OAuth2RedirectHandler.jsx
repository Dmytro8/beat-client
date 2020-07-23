import React, { Fragment, useContext, useEffect } from "react";
import { ACCESS_TOKEN } from "../../constants";
import { Redirect, useHistory } from "react-router-dom";
import { HOME, LOGIN } from "../../constants/route.urls";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import {
  updateAuthentication,
  updateToken,
} from "../../contexts/AuthContext/actions";

const getUrlParameter = (name, props) => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  let regex = new RegExp("[\\?&]" + name + "=([^&#]*)");

  let results = regex.exec(props.location.search);

  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
};

const OAuth2RedirectHandler = (props) => {
  const token = getUrlParameter("token", props);
  const error = getUrlParameter("error", props);
  // let history = useHistory();
  const [authState, authDispatch] = useContext(AuthContext);
  useEffect(() => {
    return () => {};
  }, [authState]);

  if (token) {
    localStorage.setItem(ACCESS_TOKEN, token);
    authDispatch(updateAuthentication(true));
    authDispatch(updateToken(token));
    return <Redirect to={HOME} />;
  } else {
    return (
      <Redirect
        to={{
          pathname: LOGIN,
          state: {
            from: props.location,
            error: error,
          },
        }}
      />
    );
  }
};

export default OAuth2RedirectHandler;
