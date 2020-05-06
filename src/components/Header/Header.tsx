import React, { useContext } from "react";
import { StyledButton } from "../common/FormControls";
import { AuthContext } from "../../contexts/AuthContext/authContext";
import { authAPI } from "../../api/authApi";
import {
  updateAuthentication,
  updateToken,
} from "../../contexts/AuthContext/actions";

import classes from "./Header.module.scss";
import { Link } from "react-router-dom";
import { MAIN, PROPRAMMERS } from "../../constants/route.urls";

const Header = () => {
  const [state, dispatch] = useContext(AuthContext);
  const logoutHandler = async () => {
    await authAPI.logout();
    await dispatch(updateAuthentication(false));
    await dispatch(updateToken(null));
  };
  return (
    <div className={classes.buttons}>
      <StyledButton variant="contained" onClick={logoutHandler}>
        Logout
      </StyledButton>
      <Link to={MAIN}>
        <StyledButton variant="contained">Main profile page</StyledButton>
      </Link>
      <Link to={PROPRAMMERS}>
        <StyledButton variant="contained">Don't click me!</StyledButton>
      </Link>
    </div>
  );
};

export default Header;
