import React, { FC, useContext } from "react";
import { Route } from "react-router-dom";
import {
  MountTransition,
  MotionRedirect,
} from "../../components/common/MountTransition";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { HOME } from "../../constants/route.urls";

type Props = {
  exact?: boolean;
  path: string;
};

export const RestrictedRouteTransition: FC<Props> = ({
  children,
  exact = false,
  path,
  ...rest
}) => {
  const [authState, authDispatch]: any = useContext(AuthContext);
  return (
    <>
      {authState.isAuthenticated ? (
        <MotionRedirect to={HOME} />
      ) : (
        <Route exact={exact} path={path} {...rest}>
          <MountTransition>{children}</MountTransition>
        </Route>
      )}
    </>
  );
};
