import React, { FC } from "react";
import {
  lighten,
  makeStyles,
  createStyles,
  withStyles,
  Theme,
} from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: "rgba(0,250,255,0.5)",
  },
  bar: {
    background:
      "linear-gradient(143deg, rgba(0,250,255,1) 0%, rgba(15,16,255,1) 100%)",
  },
})(LinearProgress);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    margin: {
      margin: theme.spacing(1),
    },
  })
);

type PropsType = {
  progressValue: number;
};

export const ProgressBar: FC<PropsType> = ({ progressValue }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <ColorCircularProgress size={30} thickness={5} /> */}
      {/* <ColorLinearProgress className={classes.margin} /> */}
      <BorderLinearProgress
        className={classes.margin}
        variant="determinate"
        color="secondary"
        value={progressValue}
      />
      {/* <FacebookProgress /> */}
    </div>
  );
};
