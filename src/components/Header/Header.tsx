import React, { useContext } from "react";
import { StyledButton } from "../common/FormControls";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { ProfileContext } from "../../contexts/ProfileContext/ProfileContext";

import { authAPI } from "../../api/authApi";
import classnames from "classnames";

import classes from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import { HOME, MUSIC, BASKET } from "../../constants/route.urls";

import {
  StyledBadge,
  ShoppingBasket,
  AccountCircle,
} from "../common/HeaderControls";
import { IconButton } from "@material-ui/core";
import { AccountMenu } from "../AccountMenu";
import { AuthContextType } from "../../contexts/AuthContext/types";

const Header = () => {
  const [authState, authDispatch]: any = useContext(AuthContext);
  const [profileState, profileDispatch]: any = useContext(ProfileContext);
  // const logoutHandler = async () => {
  //   await authAPI.logout();
  //   await dispatch(updateAuthentication(false));
  //   await dispatch(updateToken(null));
  // };
  // const rightControls = classnames({
  //   rightControls: true,
  //   authenticated: authState.isAuthenticated,
  // });
  let rightControls = classnames(classes.rightControls, {
    [classes.authenticated]: !authState.isAuthenticated,
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
      <div className={rightControls}>
        <div className={classes.authenticatedControls}>
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={profileState.basket.length}>
              <NavLink
                exact
                to={BASKET}
                className={classes.link}
                activeClassName={classes.activeLink}
              >
                <ShoppingBasket />
              </NavLink>
            </StyledBadge>
          </IconButton>
          <AccountMenu />
        </div>
        {/* <div className={classes.noAuthenticatedControls}>
          <button>
            <span>Sign in</span>
          </button>
        </div> */}
      </div>
      {/* <StyledButton variant="contained" onClick={logoutHandler}>
        Logout
      </StyledButton> */}
    </header>
  );
};

export default Header;
