import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { red } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

export const StyledTextField = withStyles({
  root: {
    "& label": {
      top: "7px",
    },
    "& label + .MuiInput-formControl": {
      marginTop: "20px",
    },
    "& label.Mui-focused": {
      color: "#f26a6a",
    },
    "& label.Mui-error.Mui-focused": {
      color: red[500],
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#f26a6a",
    },
    "& .MuiInput-underline.Mui-error:after": {
      borderBottomColor: red[500],
    },
  },
})(TextField);

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

export const StyledButton = withStyles({
  root: {
    marginTop: "20px",
    backgroundColor: "#f26a6a",
    "&:hover": {
      backgroundColor: "#e86060",
      overflow: "hidden",
    },

    color: "#fff",
  },
})(Button);

export const ButtonSpinner = withStyles({
  root: {
    color: "#ffffff",
    height: "23px !important",
    width: "23px !important",
  },
})(CircularProgress);
