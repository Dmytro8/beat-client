import React, { FC, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import {
  MountTransition,
  MotionRedirect,
} from "../../components/common/MountTransition";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { HOME } from "../../constants/route.urls";
import { motion } from "framer-motion";

type Props = {
  exact?: boolean;
  path: string;
};

export const PrivateRouteTransition: FC<Props> = ({
  children,
  exact = false,
  path,
  ...rest
}) => {
  const [authState, authDispatch]: any = useContext(AuthContext);
  return (
    <>
      {!authState.isAuthenticated ? (
        <MotionRedirect to={HOME} />
      ) : (
        <Route exact={exact} path={path} {...rest}>
          <MountTransition>{children}</MountTransition>
        </Route>
      )}
    </>
  );
};
