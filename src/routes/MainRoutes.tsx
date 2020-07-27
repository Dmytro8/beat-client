import React, { Suspense } from "react";
import {
  HOME,
  MUSIC,
  BASKET,
  ERROR,
  REGISTRATION,
  OAUTH2_REDIRECT,
  ABOUT,
  SETTINGS,
  CONFIRM_EMAIL,
  CONFIRMED_EMAIL,
} from "../constants/route.urls";
import { AppSpinner } from "../components/common/FormControls";
import { PlayerProvider } from "../contexts/PlayerContext/PlayerContext";
import { MainLayout } from "../layouts/MainLayout";
import { HomePage } from "../pages/HomePage";
import { MusicPage } from "../pages/MusicPage";
import { BasketPage } from "../pages/BasketPage";
import { ErrorPage } from "../pages/ErrorPage";
import { AnimatedRoutes } from "./common/AnimatedRoutes";
import { RouteTransition } from "./CustomRoutes/RouteTransition";
import { RegistrationPage } from "../pages/AuthPages/RegistrationPage";
import { PrivateRouteTransition } from "./CustomRoutes/PrivateRouteTransition";
import { RestrictedRouteTransition } from "./CustomRoutes/RestrictedRouteTransition";
import { RestrictedRoute } from "./CustomRoutes/RestrictedRoute";
import { OAuth2RedirectHandler } from "../components/OAuth2RedirectHandler";
import { Route } from "react-router-dom";
import { AboutPage } from "../pages/AboutPage";
import { SettingsPage } from "../pages/SettingsPage";
import { ConfirmEmailPage } from "../pages/EmailPages/ConfirmEmailPage";
import { ConfirmedEmailPage } from "../pages/EmailPages/ConfirmedEmailPage";

export const MainRoutes = () => {
  return (
    <PlayerProvider>
      <MainLayout>
        <Suspense fallback={<AppSpinner />}>
          <AnimatedRoutes exitBeforeEnter>
            <RouteTransition path={HOME} exact>
              <HomePage />
            </RouteTransition>
            <RouteTransition path={MUSIC} exact>
              <MusicPage />
            </RouteTransition>
            <PrivateRouteTransition path={BASKET} exact>
              <BasketPage />
            </PrivateRouteTransition>
            <PrivateRouteTransition path={ABOUT} exact>
              <AboutPage />
            </PrivateRouteTransition>
            <PrivateRouteTransition path={SETTINGS} exact>
              <SettingsPage />
            </PrivateRouteTransition>
            <RouteTransition path={ERROR} exact>
              <ErrorPage />
            </RouteTransition>
            <RestrictedRouteTransition path={REGISTRATION} exact>
              <RegistrationPage />
            </RestrictedRouteTransition>
            <RestrictedRouteTransition path={CONFIRM_EMAIL} exact>
              <ConfirmEmailPage />
            </RestrictedRouteTransition>
            {/* you have to create another route to confirmed email */}
            <RestrictedRouteTransition path={CONFIRMED_EMAIL} exact>
              <ConfirmedEmailPage />
            </RestrictedRouteTransition>
            <RestrictedRoute
              path={OAUTH2_REDIRECT}
              exact
              component={OAuth2RedirectHandler}
            />
          </AnimatedRoutes>
        </Suspense>
      </MainLayout>
    </PlayerProvider>
  );
};
