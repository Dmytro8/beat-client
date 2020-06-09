import React, { useContext } from "react";
import { StyledButton } from "../common/FormControls";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { authAPI } from "../../api/authApi";
import classnames from "classnames";

import classes from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import { HOME, MUSIC } from "../../constants/route.urls";

import {
  StyledBadge,
  ShoppingBasket,
  AccountCircle,
} from "../common/HeaderControls";
import { IconButton } from "@material-ui/core";

const Header = () => {
  const [authState, authDispatch] = useContext(AuthContext);
  // const logoutHandler = async () => {
  //   await authAPI.logout();
  //   await dispatch(updateAuthentication(false));
  //   await dispatch(updateToken(null));
  // };
  const basketIconStyle = classnames({
    shoppingBasket: true,
    hidden: !authState.isAuthenticated,
  });
  return (
    <header className={classes.header}>
      <nav>
        <NavLink
          exact
          to={HOME}
          className={classes.link}
          activeClassName={classes.activeLink}
        >
          Home
        </NavLink>
        <NavLink
          exact
          to={MUSIC}
          className={classes.link}
          activeClassName={classes.activeLink}
        >
          Music
        </NavLink>
      </nav>
      <div className={classes.rightContols}>
        <IconButton aria-label="cart" className={basketIconStyle}>
          <StyledBadge badgeContent={4}>
            <ShoppingBasket />
          </StyledBadge>
        </IconButton>
        <IconButton aria-label="cart">
          <AccountCircle />
        </IconButton>
      </div>
      {/* <StyledButton variant="contained" onClick={logoutHandler}>
        Logout
      </StyledButton> */}
    </header>
  );
};

export default Header;
