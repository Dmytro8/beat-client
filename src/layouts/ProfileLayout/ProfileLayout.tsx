import React, { FC, useContext, useEffect } from "react";
import { Header } from "../../components/Header";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

type ProfileLayoutPropsType = {
  children: React.ReactNode;
};

const ProfileLayout: FC<ProfileLayoutPropsType> = ({ children }) => {
  // const [authState, authDispatch]: any = useContext(AuthContext);
  // useEffect(() => {
  //   return () => {};
  // }, [authState]);
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default ProfileLayout;
