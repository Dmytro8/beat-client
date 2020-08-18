import React, { FC, useContext, useState, useEffect } from "react";
import { NavLink, RouteComponentProps } from "react-router-dom";
import { GENERAL, UPLOAD_SONG } from "../../constants/route.urls";
import { ProfileContext } from "../../contexts/ProfileContext/ProfileContext";
import { Spinner } from "../../components/common/FormControls";
import { AccountPage } from "../../pages/AccountPage";
import styled from "styled-components";

type AccountLayoutPropsType = {
  children: React.ReactNode;
};

const ChildrenWrapper = styled.div`
  background-color: rgb(55, 55, 55);
  border-radius: 10px;
  padding: 20px;
`;

const AccountLayout: FC<AccountLayoutPropsType> = ({ children }) => {
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <AccountPage>
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </AccountPage>
  );
};

export default AccountLayout;
