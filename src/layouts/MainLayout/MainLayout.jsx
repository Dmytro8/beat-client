import React from "react";
import { Header } from "../../components/Header";

import classes from "./MainLayout.module.scss";

const MainLayout = ({ children }) => {
  return (
    <div className={classes.mainLayout}>
      <div className={classes.container}>
        <Header />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
