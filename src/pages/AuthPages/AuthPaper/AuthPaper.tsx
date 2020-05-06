import React, { FC } from "react";
import { Paper } from "@material-ui/core";

import classes from "./AuthPaper.module.scss";

type PaperPropsType = {
  children: React.ReactNode;
  title: string;
};

const AuthPaper: FC<PaperPropsType> = ({ children, title }) => {
  return (
    <div className={classes.wrapper}>
      <Paper elevation={0} className={classes.paper}>
        <h1 className={classes.title}>{title}</h1>
        {children}
      </Paper>
    </div>
  );
};

export default AuthPaper;
