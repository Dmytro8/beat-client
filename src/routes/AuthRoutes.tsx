import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { LOGIN, REGISTRATION, OAUTH2_REDIRECT } from "../constants/route.urls";
import { LoginPage } from "../pages/AuthPages/LoginPage";
import { RegistrationPage } from "../pages/AuthPages/RegistrationPage";
import { OAuth2RedirectHandler } from "../components/OAuth2RedirectHandler";
import { AppSpinner } from "../components/common/FormControls";

export const AuthRoutes = () => (
  <AuthLayout>
    <Suspense fallback={<AppSpinner />}>
      <Switch>
        <Route path={LOGIN} exact component={LoginPage} />
        <Route path={REGISTRATION} exact component={RegistrationPage} />
        <Route path={OAUTH2_REDIRECT} component={OAuth2RedirectHandler} />
        <Redirect to={LOGIN} />
      </Switch>
    </Suspense>
  </AuthLayout>
);
