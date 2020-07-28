import React, { FC } from "react";
import { Route } from "react-router-dom";
import {
  MountTransition,
  MotionRedirect,
} from "../../components/common/MountTransition";
import { HOME } from "../../constants/route.urls";
import { ACCESS_TOKEN } from "../../constants";
import { TransitionRoute } from "./TransitionRoute";

type Props = {
  exact?: boolean;
  path: string;
  component: any;
  isTransition: boolean;
};

export const PrivateRoute: FC<Props> = ({
  exact = false,
  path = HOME,
  component: Component,
  isTransition = false,
  ...rest
}) => {
  const isAuthenticated = !!localStorage.getItem(ACCESS_TOKEN);

  if (!isAuthenticated) {
    return <MotionRedirect to={HOME} />;
  } else if (isTransition) {
    return (
      <TransitionRoute
        path={path}
        exact={exact}
        {...rest}
        component={Component}
      />
    );
  } else {
    return (
      <Route
        exact={exact}
        path={path}
        {...rest}
        render={(routeProps) => <Component {...routeProps} />}
      />
    );
  }
};
