import React, { FC, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { MountTransition } from "../../components/common/MountTransition";
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
        <Redirect to={HOME} />
      ) : (
        <Route exact={exact} path="/admang/service-center" {...rest}>
          <MountTransition>{children}</MountTransition>
        </Route>
      )}
    </>
  );
};
