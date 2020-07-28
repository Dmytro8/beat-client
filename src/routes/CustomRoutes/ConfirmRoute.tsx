import React, { FC, useContext, useEffect } from "react";
import { Route } from "react-router-dom";
import {
  MountTransition,
  MotionRedirect,
} from "../../components/common/MountTransition";
import { HOME } from "../../constants/route.urls";
import { ProfileContext } from "../../contexts/ProfileContext/ProfileContext";
import { TransitionRoute } from "./TransitionRoute";

type Props = {
  exact?: boolean;
  path: string;
  component: any;
  isConfirmed: boolean;
};

export const ConfirmRoute: FC<Props> = ({
  exact = false,
  path,
  component: Component,
  isConfirmed = false,
  ...rest
}) => {
  const [profileState, profileDispatch]: any = useContext(ProfileContext);
  useEffect(() => {
    return () => {};
  }, [profileState]);

  if (
    profileState.profile.enabled ||
    (profileState.profile.enabled === 0 && isConfirmed)
  ) {
    return <MotionRedirect to={HOME} />;
  } else if (profileState.profile.enabled === 0) {
    return (
      <TransitionRoute
        path={path}
        exact={exact}
        {...rest}
        component={Component}
      />
    );
  } else return null;
};
