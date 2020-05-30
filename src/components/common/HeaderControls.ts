import Badge from "@material-ui/core/Badge";
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";

import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

export const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: -3,
      top: 24,
      color: "#fff",
      // border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
      backgroundColor: "#0883fc",
    },
  })
)(Badge);

export const ShoppingBasket = withStyles(() =>
  createStyles({
    root: {
      fontSize: "30px",
      color: "#fff",
    },
  })
)(ShoppingBasketIcon);

export const AccountCircle = withStyles(() =>
  createStyles({
    root: {
      fontSize: "30px",
      color: "#fff",
    },
  })
)(AccountCircleIcon);
