import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
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
        <Redirect to={LOGIN} />
      </Switch>
    </Suspense>
  </AuthLayout>
);
