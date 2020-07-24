import React, { FC, useContext } from "react";
import { Route } from "react-router-dom";
import { MotionRedirect } from "../../components/common/MountTransition";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { HOME } from "../../constants/route.urls";

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
  const [authState, authDispatch]: any = useContext(AuthContext);
  return (
    <>
      {authState.isAuthenticated ? (
        <MotionRedirect to={HOME} />
      ) : (
        <Route exact={exact} path={path} {...rest} />
      )}
    </>
  );
};
