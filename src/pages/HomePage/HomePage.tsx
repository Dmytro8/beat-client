import React, { useContext, useEffect } from "react";

import classes from "./HomePage.module.scss";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

const HomePage = () => {
  // const [authState, authDispatch]: any = useContext(AuthContext);
  // useEffect(() => {
  //   return () => {};
  // }, [authState]);
  return <div className={classes.homePage}>Home page</div>;
};

export default HomePage;
