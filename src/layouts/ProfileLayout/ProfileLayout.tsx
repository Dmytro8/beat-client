import React, { FC } from "react";
import { Header } from "../../components/Header";

type ProfileLayoutPropsType = {
  children: React.ReactNode;
};

const ProfileLayout: FC<ProfileLayoutPropsType> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default ProfileLayout;
