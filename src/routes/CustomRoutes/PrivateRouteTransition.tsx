import React, { FC } from "react";
import { Route } from "react-router-dom";
import {
  MountTransition,
  MotionRedirect,
} from "../../components/common/MountTransition";
import { HOME } from "../../constants/route.urls";
import { ACCESS_TOKEN } from "../../constants";

type Props = {
  exact?: boolean;
  path: string;
};

export const PrivateRouteTransition: FC<Props> = ({
  children,
  exact = false,
  path = HOME,
  ...rest
}) => {
  const isAuthenticated = !!localStorage.getItem(ACCESS_TOKEN);

  return (
    <>
      {!isAuthenticated ? (
        <MotionRedirect to={HOME} />
      ) : (
        <Route exact={exact} path={path} {...rest}>
          <MountTransition>{children}</MountTransition>
        </Route>
      )}
    </>
  );
};
