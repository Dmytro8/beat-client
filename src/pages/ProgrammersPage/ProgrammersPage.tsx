import React from "react";
import classes from "./ProgrammersPage.module.scss";
import programmer_dmytro from "../../static/images/programmer_dmytro.jpg";
import programmer_mykyta from "../../static/images/programmer_mykyta.jpg";

const ProgrammersPage = () => {
  return (
    <div className={classes.programmersPage}>
      <div>
        <h1>The best programmers greeting You!</h1>
      </div>
      <div className={classes.programmersImg}>
        <div className={classes.imgWrapper}>
          <img src={programmer_dmytro} alt="programmer_dmytro" />
        </div>
        <div className={classes.imgWrapper}>
          <img src={programmer_mykyta} alt="programmer_mykyta" />
        </div>
      </div>
    </div>
  );
};

export default ProgrammersPage;
