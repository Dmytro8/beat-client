import TextField from "@material-ui/core/TextField";
import { red } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

export const StyledTextField = withStyles({
  root: {
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

export const Spinner = withStyles({
  root: {
    color: "#ffffff",
    height: "23px !important",
    width: "23px !important",
  },
})(CircularProgress);
