import React, { FC } from "react";
import Button from "@material-ui/core/Button";

import classes from "./AuthLayout.module.scss";
import { NavLink } from "react-router-dom";
<<<<<<< HEAD
import { LOGIN, REGISTRATION } from "../../constants/route.urls";
=======
import { LOGIN, REGISTRATION } from "../../constants/url";
>>>>>>> 0b9ccaf9198a3634340cc8c0fc0a9ef1953c498e
import authBg from "../../static/images/authBg.jpg";
import HeadsetIcon from "@material-ui/icons/Headset";

type AuthLayoutType = {};

const authBgStyle = {
  backgroundImage: `url(${authBg})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  height: "100%",
};
const childrenWrapperStyle = {
  height: "100%",
  display: "grid",
<<<<<<< HEAD
  alignContent: "center",
=======
  placeContent: "center",
>>>>>>> 0b9ccaf9198a3634340cc8c0fc0a9ef1953c498e
};

const AuthLayout: FC<AuthLayoutType> = ({ children }) => {
  return (
    <div style={authBgStyle}>
      {/* <NavLink to={LOGIN}>
        <Button variant="contained" color="primary">
          LOGIN
        </Button>
      </NavLink> */}
      <HeadsetIcon className={classes.headset} />
      <div style={childrenWrapperStyle}>{children}</div>
      {/* <NavLink to={REGISTRATION}>
        <Button variant="contained" color="secondary">
          REGISTRATION
        </Button>
      </NavLink> */}
    </div>
  );
};

export default AuthLayout;
