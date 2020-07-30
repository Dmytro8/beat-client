import React, {
  FC,
  useRef,
  useState,
  useContext,
  useEffect,
  Fragment,
} from "react";

import classes from "./AccountPage.module.scss";
import { NavLink } from "react-router-dom";
import { UPLOAD_SONG, ACCOUNT, GENERAL } from "../../constants/route.urls";
import { ProfileContext } from "../../contexts/ProfileContext/ProfileContext";
// @ts-ignore
import Media from "react-media";

type AccountPagePropsType = {
  children: React.ReactNode;
};

export const AccountPage: FC<AccountPagePropsType> = ({ children }) => {
  const [profileState, profileDispatch]: any = useContext(ProfileContext);

  const smallDeviceRoutes = [
    { [GENERAL]: "Account", isAdmin: false },
    { [UPLOAD_SONG]: "Upload song", isAdmin: true },
  ];
  const largeDeviceRoutes = [
    { "": "Account", isAdmin: false },
    { [UPLOAD_SONG]: "Upload song", isAdmin: true },
  ];

  const renderLinks = (routes: any) => {
    if (profileState.profile.accountRole?.role !== "ROLE_ADMIN") {
      return routes
        .filter((route: any) => !route.isAdmin)
        .map((route: object, index: number) => (
          <li key={index}>
            <NavLink to={`${ACCOUNT}${Object.entries(route)[0][0]}`}>
              {Object.entries(route)[0][1]}
            </NavLink>
          </li>
        ));
    } else
      return routes.map((route: object, index: number) => (
        <li key={index}>
          <NavLink to={`${ACCOUNT}${Object.entries(route)[0][0]}`}>
            {Object.entries(route)[0][1]}
          </NavLink>
        </li>
      ));
  };
  return (
    <div className={classes.account}>
      <nav>
        {/* {isLoading ? (
          <div className={classes.spinnerWrapper}>
            <Spinner />
          </div>
        ) : ( */}
        <Media
          queries={{
            small: "(max-width: 700px)",
            large: "(min-width: 701px)",
          }}
        >
          {(matches: any) => (
            <Fragment>
              {matches.small && <ul>{renderLinks(smallDeviceRoutes)}</ul>}
              {matches.large && <ul>{renderLinks(largeDeviceRoutes)}</ul>}
            </Fragment>
          )}
        </Media>

        {/* )} */}
      </nav>
      {children ?? null}
    </div>
  );
};
