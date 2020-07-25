import React, { FC } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";

import { AccountCircle } from "../../HeaderControls";
import { Link } from "react-router-dom";
import { ABOUT, SETTINGS } from "../../../../constants/route.urls";

const StyledMenu = withStyles({
  paper: {
    borderRadius: "unset",
    left: "unset !important",
    right: "5vw",
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: "#0883fc",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
    paddingLeft: "60px",
    paddingRight: "16px",
  },
}))(MenuItem);

type PropsType = {
  anchorEl: any;
  setAnchorEl: (anchor: any) => void;
};
const useStyles = makeStyles({
  root: {
    // backgroundColor: "black",
  },
  item: {
    color: "black",
    textAlign: "end",
  },
});

export const AccountMenu = ({ anchorEl, setAnchorEl }: PropsType) => {
  const classes = useStyles();
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <StyledMenu
      id="customized-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      TransitionComponent={Fade}
    >
      <Link to={SETTINGS} onClick={handleClose}>
        <StyledMenuItem>
          <ListItemText className={classes.item}>Account</ListItemText>
        </StyledMenuItem>
      </Link>
      <Link to={ABOUT} onClick={handleClose}>
        <StyledMenuItem>
          <ListItemText className={classes.item}>About</ListItemText>
        </StyledMenuItem>
      </Link>
    </StyledMenu>
  );
};
