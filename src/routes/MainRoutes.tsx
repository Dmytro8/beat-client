import React, { Suspense } from "react";
import { HOME, MUSIC, BASKET, ERROR } from "../constants/route.urls";
import { AppSpinner } from "../components/common/FormControls";
import { PlayerProvider } from "../contexts/PlayerContext/PlayerContext";
import { MainLayout } from "../layouts/MainLayout";
import { HomePage } from "../pages/HomePage";
import { MusicPage } from "../pages/MusicPage";
import { BasketPage } from "../pages/BasketPage";
import { ErrorPage } from "../pages/ErrorPage";
import { AnimatedRoutes } from "./common/AnimatedRoutes";
import { RouteTransition } from "./common/RouteTransition";

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
            <RouteTransition path={BASKET} exact>
              <BasketPage />
            </RouteTransition>
            <RouteTransition path={ERROR} exact>
              <ErrorPage />
            </RouteTransition>
          </AnimatedRoutes>
        </Suspense>
      </MainLayout>
    </PlayerProvider>
  );
};
