import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { HOME, MUSIC, BASKET } from "../constants/route.urls";
import { AppSpinner } from "../components/common/FormControls";
import { PlayerProvider } from "../contexts/PlayerContext/PlayerContext";
import { MainLayout } from "../layouts/MainLayout";
import { HomePage } from "../pages/HomePage";
import { MusicPage } from "../pages/MusicPage";
import { BasketPage } from "../pages/BasketPage";

export const MainRoutes = () => {
  return (
    <MainLayout>
      <Suspense fallback={<AppSpinner />}>
        <Switch>
          <Route path={HOME} exact component={HomePage} />
          <PlayerProvider>
            <Route path={MUSIC} exact component={MusicPage} />
            <Route path={BASKET} exact component={BasketPage} />
          </PlayerProvider>
          <Redirect to={HOME} />
        </Switch>
      </Suspense>
    </MainLayout>
  );
};
