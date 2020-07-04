import React, { Suspense } from "react";
import {
  HOME,
  MUSIC,
  BASKET,
  ERROR,
  REGISTRATION,
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

export const MainRoutes = () => {
  return (
    <PlayerProvider>
      <MainLayout>
        <Suspense fallback={<AppSpinner />}>
          <AnimatedRoutes exitBeforeEnter initial={false}>
            <RouteTransition path={HOME} exact>
              <HomePage />
            </RouteTransition>
            <RouteTransition path={MUSIC} exact>
              <MusicPage />
            </RouteTransition>
            <PrivateRouteTransition path={BASKET} exact>
              <BasketPage />
            </PrivateRouteTransition>
            <RouteTransition path={ERROR} exact>
              <ErrorPage />
            </RouteTransition>
            <RestrictedRouteTransition path={REGISTRATION} exact>
              <RegistrationPage />
            </RestrictedRouteTransition>
          </AnimatedRoutes>
        </Suspense>
      </MainLayout>
    </PlayerProvider>
  );
};
