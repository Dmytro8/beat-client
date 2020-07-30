import React, { FC, useContext } from "react";
import { Route } from "react-router-dom";
import {
  MountTransition,
  MotionRedirect,
} from "../../components/common/MountTransition";
import { HOME, ACCOUNT } from "../../constants/route.urls";
import { ACCESS_TOKEN } from "../../constants";
import { TransitionRoute } from "./TransitionRoute";
import { ProfileContext } from "../../contexts/ProfileContext/ProfileContext";

type Props = {
  exact?: boolean;
  path: string;
  component: any;
  isTransition: boolean;
};

export const AdminRoute: FC<Props> = ({
  exact = false,
  path = HOME,
  component: Component,
  isTransition = false,
  ...rest
}) => {
  const isAuthenticated = !!localStorage.getItem(ACCESS_TOKEN);
  const [profileState, profileDispatch]: any = useContext(ProfileContext);
  if (
    !isAuthenticated ||
    profileState.profile.accountRole?.role !== "ROLE_ADMIN"
  ) {
    return <MotionRedirect to={`${ACCOUNT}`} />;
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
