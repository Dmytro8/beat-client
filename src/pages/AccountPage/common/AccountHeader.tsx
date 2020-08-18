import React, { FC } from "react";
import styled from "styled-components";

type AccountHeaderPropsType = {
  title: string;
};

const Header = styled.header`
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const HeadingH1 = styled.h1`
  color: white;
`;

export const AccountHeader: FC<AccountHeaderPropsType> = ({ title }) => {
  return (
    <Header>
      <HeadingH1>{title}</HeadingH1>
    </Header>
  );
};
