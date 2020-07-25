import React from "react";
import { ACCESS_TOKEN } from "../../constants";
import { HOME } from "../../constants/route.urls";
import { MotionRedirect } from "../common/MountTransition";

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
    return <MotionRedirect to={HOME} />;
  } else {
    return <MotionRedirect to={props.location} />;
  }
};

export default OAuth2RedirectHandler;
