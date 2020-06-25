import React, { FC } from "react";
import { Route } from "react-router-dom";
import { MountTransition } from "../../components/common/MountTransition";

type Props = {
  exact?: boolean;
  path: string;
};

export const RouteTransition: FC<Props> = ({
  children,
  exact = false,
  path,
  ...rest
}) => (
  <Route exact={exact} path="/admang/service-center" {...rest}>
    <MountTransition>{children}</MountTransition>
  </Route>
);
