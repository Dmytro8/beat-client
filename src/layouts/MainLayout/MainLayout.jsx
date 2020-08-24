import React from "react";
import styled from "styled-components";

import { Header } from "../../components/Header";
import classes from "./MainLayout.module.scss";

import homeBg from "../../static/images/homeBg.jpg";

const Layout = styled.div`
  background-image: url(${homeBg});
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
`;

const MainLayout = ({ children }) => {
  return (
    <Layout className={classes.mainLayout}>
      <div className={classes.container}>
        <Header />
        {children}
      </div>
    </Layout>
  );
};

export default MainLayout;
