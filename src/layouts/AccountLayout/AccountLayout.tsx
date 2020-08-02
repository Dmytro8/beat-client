import React, { FC, useContext, useState, useEffect } from "react";

import classes from "./AccountLayout.module.scss";
import { NavLink, RouteComponentProps } from "react-router-dom";
import { GENERAL, UPLOAD_SONG } from "../../constants/route.urls";
import { ProfileContext } from "../../contexts/ProfileContext/ProfileContext";
import { Spinner } from "../../components/common/FormControls";
import { AccountPage } from "../../pages/AccountPage";

type AccountLayoutPropsType = {
  children: React.ReactNode;
};

const AccountLayout: FC<AccountLayoutPropsType> = ({ children }) => {
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <AccountPage>
      <section>{children}</section>
    </AccountPage>
  );
};

export default AccountLayout;
