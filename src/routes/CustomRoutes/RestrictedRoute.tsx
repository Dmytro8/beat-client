import React, { FC } from "react";
import { Route } from "react-router-dom";
import { MotionRedirect } from "../../components/common/MountTransition";
import { HOME } from "../../constants/route.urls";
import { ACCESS_TOKEN } from "../../constants";

type Props = {
  exact?: boolean;
  path: string;
  component: React.FunctionComponent;
};

export const RestrictedRoute: FC<Props> = ({
  exact = false,
  path,
  ...rest
}) => {
  const isAuthenticated = !!localStorage.getItem(ACCESS_TOKEN);
  return (
    <>
      {isAuthenticated ? (
        <MotionRedirect to={HOME} />
      ) : (
        <Route exact={exact} path={path} {...rest} />
      )}
    </>
  );
};
