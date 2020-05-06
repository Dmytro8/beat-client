import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { MAIN, PROPRAMMERS } from "../constants/route.urls";
import { ProfileLayout } from "../layouts/ProfileLayout";
import { ProfilePage } from "../pages/ProfilePage";
import { AppSpinner } from "../components/common/FormControls";
import { ProgrammersPage } from "../pages/ProgrammersPage";

export const ProfileRoutes = () => {
  return (
    <ProfileLayout>
      <Suspense fallback={<AppSpinner />}>
        <Switch>
          <Route path={MAIN} exact component={ProfilePage} />
          <Route path={PROPRAMMERS} exact component={ProgrammersPage} />
          <Redirect to={MAIN} />
        </Switch>
      </Suspense>
    </ProfileLayout>
  );
};
