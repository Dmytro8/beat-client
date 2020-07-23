import React, { FC } from "react";
import { Route } from "react-router-dom";
import { MountTransition } from "../../components/common/MountTransition";
import { HOME } from "../../constants/route.urls";

type Props = {
  exact?: boolean;
  path: string;
};

export const RouteTransition: FC<Props> = ({
  children,
  exact = false,
  path = HOME,
  ...rest
}) => (
  <Route exact={exact} path={path} {...rest}>
    <MountTransition>{children}</MountTransition>
  </Route>
);
