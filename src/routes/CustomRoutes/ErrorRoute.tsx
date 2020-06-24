import React, { FC, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { Route, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { HOME } from "../../constants/route.urls";

type ErrorRouteProps = {
  component: React.ReactNode;
};

const ErrorRoute: FC<ErrorRouteProps> = ({ component: ErrorPage, ...rest }) => {
  // const [authState, authDispatch]: any = useContext(AuthContext);
  // let history = useHistory();
  // if (authState.isError) {
  //   return <Route {...rest} render={(props) => <ErrorPage {...props} />} />;
  // } else history.push(HOME);
  return null;
};

export default ErrorRoute;
