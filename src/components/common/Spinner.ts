import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";

export const AppSpinner = withStyles({
  root: {
    position: "absolute",
    color: "#f26a6a",
    top: "50%",
    left: "50%",
    marginLeft: "-20px",
    marginTop: "-20px",
    width: "40px !important",
    height: "40px !important",
  },
})(CircularProgress);

export const ButtonSpinner = withStyles({
  root: {
    color: "#ffffff",
    height: "23px !important",
    width: "23px !important",
  },
})(CircularProgress);

export const Spinner = withStyles({
  root: {
    height: "30px !important",
    width: "30px !important",
    color: "darkorange",
  },
})(CircularProgress);
