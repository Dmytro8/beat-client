import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
<<<<<<< HEAD
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
=======
import { LOGIN, REGISTRATION } from "../constants/url";
import { LoginPage } from "../pages/LoginPage";
import { RegistrationPage } from "../pages/RegistrationPage";

export const AuthRoutes = () => (
  <AuthLayout>
    <Suspense
      fallback={
        <div>
          Loading ...
          {/* <Preloader /> */}
        </div>
      }
    >
      <Switch>
        <Route path={LOGIN} exact component={LoginPage} />
        <Route path={REGISTRATION} exact component={RegistrationPage} />
>>>>>>> 0b9ccaf9198a3634340cc8c0fc0a9ef1953c498e
        <Redirect to={LOGIN} />
      </Switch>
    </Suspense>
  </AuthLayout>
);
