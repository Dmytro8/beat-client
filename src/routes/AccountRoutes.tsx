import React, { useEffect, Fragment, FC } from "react";
import { RouteProps } from "react-router-dom";
import { AccountLayout } from "../layouts/AccountLayout";
import { PrivateRoute } from "./CustomRoutes/PrivateRoute";
import { AnimatedRoutes } from "./common/AnimatedRoutes";
import {
  ACCOUNT,
  GENERAL,
  UPLOAD_SONG,
  SONGS,
  FAVOURITE_SONGS,
} from "../constants/route.urls";
import { GeneralPage } from "../pages/AccountPage/AccountSubpages/GeneralPage";
import { UploadPage } from "../pages/AccountPage/AccountSubpages/UploadPage";
import { Switch } from "react-router-dom";
import { MotionRedirect } from "../components/common/MountTransition";
import { AdminRoute } from "./CustomRoutes/AdminRoute";
import { UserRoute } from "./CustomRoutes/UserRoute";
// @ts-ignore
import Media from "react-media";
import { AccountPage } from "../pages/AccountPage";
import { SongsPage } from "../pages/AccountPage/AccountSubpages/SongsPage";
import { FavouritePage } from "../pages/AccountPage/AccountSubpages/FavouritePage";

type RouteType = {
  routeProps: RouteProps;
};

const LargeDeviceRoutes: FC<RouteType> = () => {
  return (
    <>
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
    </>
  );
};
const SmallDeviceRoutes: FC<RouteType> = () => {
  return (
    <>
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
    </>
  );
};

const Routes: FC<RouteType> = (routeProps: any) => {
  return (
    <Switch location={routeProps.location}>
      <UserRoute
        path={`${ACCOUNT}${FAVOURITE_SONGS}`}
        exact
        component={FavouritePage}
        isTransition
      />
      <AdminRoute
        path={`${ACCOUNT}${UPLOAD_SONG}`}
        exact
        component={UploadPage}
        isTransition
      />
      <AdminRoute
        path={`${ACCOUNT}${SONGS}`}
        exact
        component={SongsPage}
        isTransition
      />
      {routeProps.children}
      <MotionRedirect to={`${ACCOUNT}`} />
    </Switch>
  );
};

export const AccountRoutes = (props: any) => {
  return (
    <Media
      queries={{
        small: "(max-width: 700px)",
        large: "(min-width: 701px)",
      }}
    >
      {(matches: any) => (
        <Fragment>
          {matches.small && (
            <Routes routeProps={props}>
              <SmallDeviceRoutes routeProps={props} />
            </Routes>
          )}
          {matches.large && (
            <AccountLayout>
              <Routes routeProps={props}>
                <LargeDeviceRoutes routeProps={props} />
              </Routes>
            </AccountLayout>
          )}
        </Fragment>
      )}
    </Media>
  );
};
