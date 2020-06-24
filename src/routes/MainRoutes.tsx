import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { HOME, MUSIC, BASKET, ERROR } from "../constants/route.urls";
import { AppSpinner } from "../components/common/FormControls";
import { PlayerProvider } from "../contexts/PlayerContext/PlayerContext";
import { MainLayout } from "../layouts/MainLayout";
import { HomePage } from "../pages/HomePage";
import { MusicPage } from "../pages/MusicPage";
import { BasketPage } from "../pages/BasketPage";
import { ErrorPage } from "../pages/ErrorPage";

export const MainRoutes = () => {
  return (
    <PlayerProvider>
      <MainLayout>
        <Suspense fallback={<AppSpinner />}>
          <Switch>
            <Route path={HOME} exact component={HomePage} />
            <Route path={MUSIC} exact component={MusicPage} />
            <Route path={BASKET} exact component={BasketPage} />
            <Route path={ERROR} exact component={ErrorPage} />
            <Redirect to={HOME} />
          </Switch>
        </Suspense>
      </MainLayout>
    </PlayerProvider>
  );
};
