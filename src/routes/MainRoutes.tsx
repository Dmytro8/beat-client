import React from "react";
import {
  HOME,
  MUSIC,
  BASKET,
  ERROR,
  REGISTRATION,
  OAUTH2_REDIRECT,
  ABOUT,
  CONFIRM_EMAIL,
  CONFIRMED_EMAIL,
  ACCOUNT,
} from "../constants/route.urls";
import { PlayerProvider } from "../contexts/PlayerContext/PlayerContext";
import { MainLayout } from "../layouts/MainLayout";
import { HomePage } from "../pages/HomePage";
import { MusicPage } from "../pages/MusicPage";
import { BasketPage } from "../pages/BasketPage";
import { ErrorPage } from "../pages/ErrorPage";
import { AnimatedRoutes } from "./common/AnimatedRoutes";
import { TransitionRoute } from "./CustomRoutes/TransitionRoute";
import { RegistrationPage } from "../pages/AuthPages/RegistrationPage";
import { PrivateRoute } from "./CustomRoutes/PrivateRoute";
import { RestrictedRoute } from "./CustomRoutes/RestrictedRoute";
import { OAuth2RedirectHandler } from "../components/OAuth2RedirectHandler";
import { AboutPage } from "../pages/AboutPage";
import { ConfirmEmailPage } from "../pages/EmailPages/ConfirmEmailPage";
import { ConfirmedEmailPage } from "../pages/EmailPages/ConfirmedEmailPage";
import { ConfirmRoute } from "./CustomRoutes/ConfirmRoute";
import { AccountRoutes } from "./AccountRoutes";

export const MainRoutes = () => {
  return (
    <PlayerProvider>
      <MainLayout>
        <AnimatedRoutes exitBeforeEnter>
          <TransitionRoute path={HOME} exact component={HomePage} />
          <TransitionRoute path={MUSIC} exact component={MusicPage} />
          <TransitionRoute path={ERROR} exact component={ErrorPage} />
          <PrivateRoute
            path={BASKET}
            exact
            component={BasketPage}
            isTransition
          />
          <PrivateRoute path={ABOUT} exact component={AboutPage} isTransition />
          <PrivateRoute
            path={`${ACCOUNT}/:subpage?`}
            exact
            component={AccountRoutes}
            isTransition={false}
          />
          <RestrictedRoute
            path={REGISTRATION}
            exact
            component={RegistrationPage}
            isTransition
          />
          <RestrictedRoute
            path={OAUTH2_REDIRECT}
            exact
            component={OAuth2RedirectHandler}
            isTransition={false}
          />
          <ConfirmRoute
            path={CONFIRM_EMAIL}
            exact
            component={ConfirmEmailPage}
            isConfirmed={false}
          />
          <ConfirmRoute
            path={CONFIRMED_EMAIL}
            exact
            component={ConfirmedEmailPage}
            isConfirmed
          />
        </AnimatedRoutes>
      </MainLayout>
    </PlayerProvider>
  );
};
