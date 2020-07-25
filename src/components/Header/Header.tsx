import React, { useContext, useState, useEffect } from "react";
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
import { AccountMenu } from "../common/Menu/AccountMenu";
import { AuthContextType } from "../../contexts/AuthContext/types";
import { NotLoggingModal } from "../common/Modals/NotLoggingModal";

export const Header = () => {
  const [authState, authDispatch]: any = useContext(AuthContext);
  const [profileState, profileDispatch]: any = useContext(ProfileContext);
  const [openModalSign, setOpenModalSign] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenModalSign = () => {
    setOpenModalSign(true);
  };

  const handleCloseModalSign = () => {
    setOpenModalSign(false);
  };

  const basketController = () => {
    if (authState.isAuthenticated) {
      return (
        <NavLink
          exact
          to={BASKET}
          className={classes.link}
          activeClassName={classes.activeLink}
        >
          <ShoppingBasket />
        </NavLink>
      );
    } else {
      return <ShoppingBasket onClick={handleOpenModalSign} />;
    }
  };

  const handleClickAccount = (event: React.MouseEvent<HTMLElement>) => {
    if (authState.isAuthenticated) {
      setAnchorEl(event.currentTarget);
    } else handleOpenModalSign();
  };

  return (
    <>
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
        <div className={classes.rightControls}>
          <div className={classes.authenticatedControls}>
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={profileState.basket.length}>
                {basketController()}
              </StyledBadge>
            </IconButton>
            <IconButton aria-label="cart" onClick={handleClickAccount}>
              <AccountCircle />
            </IconButton>
            <AccountMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
          </div>
        </div>
      </header>
      <NotLoggingModal
        open={openModalSign}
        handleCloseModalSign={handleCloseModalSign}
      />
    </>
  );
};
