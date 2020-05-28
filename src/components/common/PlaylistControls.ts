import { withStyles } from "@material-ui/core/styles";
import { Slider, Button } from "@material-ui/core";

export const PrettoSlider = withStyles({
  root: {
    height: 4,
  },
  thumb: {
    height: 10,
    width: 10,
    backgroundColor: "#fff",
    marginTop: "-3px",
    marginLeft: "-6px",
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    color: "#919191",
    height: 4,
    borderRadius: 2,
  },
  rail: {
    color: "#717171",
    height: 4,
    borderRadius: 2,
  },
})(Slider);

export const PlaylistButton = withStyles({
  root: {
    padding: "5px",
    color: "white",
    backgroundColor: "#0883fc",
    "&:hover": {
      backgroundColor: "#006fe8",
    },
  },
})(Button);
