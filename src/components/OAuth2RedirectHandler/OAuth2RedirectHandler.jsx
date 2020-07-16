import React from "react";
import { ACCESS_TOKEN } from "../../constants";
import { Redirect } from "react-router-dom";
import { HOME, LOGIN } from "../../constants/route.urls";

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

  if (token) {
    localStorage.setItem(ACCESS_TOKEN, token);
    return (
      <Redirect
        to={{
          pathname: HOME,
          state: { from: props.location },
        }}
      />
    );
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
