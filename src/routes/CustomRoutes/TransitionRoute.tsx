import React, { FC } from "react";
import { Route } from "react-router-dom";
import { MountTransition } from "../../components/common/MountTransition";
import { HOME } from "../../constants/route.urls";

type Props = {
  exact?: boolean;
  path: string;
  component: any;
};

export const TransitionRoute: FC<Props> = ({
  children,
  exact = false,
  path = HOME,
  component: Component,
  ...rest
}) => (
  <Route
    exact={exact}
    path={path}
    {...rest}
    render={(routeProps) => (
      <MountTransition>
        <Component {...routeProps} />
      </MountTransition>
    )}
  />
);
