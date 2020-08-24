import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

export const StyledTextField = withStyles({
  root: {
    "& .MuiInput-input": {
      color: "white",
    },
    "& label": {
      top: "7px",
      color: "white",
    },
    "& label + .MuiInput-formControl": {
      marginTop: "20px",
    },
    "& label.Mui-focused": {
      color: "darkorange",
    },
    "& label.Mui-error.Mui-focused": {
      color: "#ed4337",
    },
    // "& .MuiInput-underline:before": {
    //   borderBottomColor: "white",
    // },
    // "&:hover .MuiInput-underline:before": {
    //   borderBottomColor: "white",
    // },
    "& .MuiInput-underline:after": {
      borderBottomColor: "darkorange",
    },
    "& .MuiInput-underline.Mui-error:after": {
      borderBottomColor: "#ed4337",
    },
    "&:hover .MuiInput-underline.Mui-error:after": {
      borderBottomColor: "#ed4337",
    },
  },
})(TextField);

export const StyledButton = withStyles({
  root: {
    marginTop: "20px",
    backgroundColor: "darkorange",
    "&:hover": {
      backgroundColor: "darkorange",
      overflow: "hidden",
    },

    color: "#fff",
  },
})(Button);
