import React, { useEffect, Fragment, FC } from "react";
import { RouteProps } from "react-router-dom";
import { AccountLayout } from "../layouts/AccountLayout";
import { PrivateRoute } from "./CustomRoutes/PrivateRoute";
import { AnimatedRoutes } from "./common/AnimatedRoutes";
import { ACCOUNT, GENERAL, UPLOAD_SONG } from "../constants/route.urls";
import { GeneralPage } from "../pages/AccountPage/AccountSubpages/GeneralPage";
import { UploadPage } from "../pages/AccountPage/AccountSubpages/UploadPage";
import { Switch } from "react-router-dom";
import { MotionRedirect } from "../components/common/MountTransition";
import { AdminRoute } from "./CustomRoutes/AdminRoute";
// @ts-ignore
import Media from "react-media";
import { AccountPage } from "../pages/AccountPage";

type RouteType = {
  routeProps: RouteProps;
};

const LargeDeviceRoutes: FC<RouteType> = ({ routeProps }) => {
  return (
    <Switch location={routeProps.location}>
      <PrivateRoute
        path={`${ACCOUNT}`}
        exact
        component={GeneralPage}
        isTransition
      />
      <AdminRoute
        path={`${ACCOUNT}${UPLOAD_SONG}`}
        exact
        component={UploadPage}
        isTransition
      />
      <MotionRedirect to={`${ACCOUNT}`} />
    </Switch>
  );
};
const SmallDeviceRoutes: FC<RouteType> = ({ routeProps }) => {
  return (
    <Switch location={routeProps.location}>
      <PrivateRoute
        path={`${ACCOUNT}`}
        exact
        component={AccountPage}
        isTransition
      />
      <PrivateRoute
        path={`${ACCOUNT}${GENERAL}`}
        exact
        component={GeneralPage}
        isTransition
      />
      <AdminRoute
        path={`${ACCOUNT}${UPLOAD_SONG}`}
        exact
        component={UploadPage}
        isTransition
      />
      <MotionRedirect to={`${ACCOUNT}`} />
    </Switch>
  );
};

export const AccountRoutes = (props: any) => {
  console.log(props);

  return (
    <Media
      queries={{
        small: "(max-width: 700px)",
        large: "(min-width: 701px)",
      }}
    >
      {(matches: any) => (
        <Fragment>
          {matches.small && <SmallDeviceRoutes routeProps={props} />}
          {matches.large && (
            <AccountLayout>
              <LargeDeviceRoutes routeProps={props} />
            </AccountLayout>
          )}
        </Fragment>
      )}
    </Media>
  );
};
