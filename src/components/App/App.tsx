import React, { useState, useEffect, Fragment, useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthRoutes } from "../../routes/AuthRoutes";
import { AuthContext } from "../../contexts/AuthContext/authContext";
import { ACCESS_TOKEN } from "../../constants";
import { authAPI } from "../../api/authApi";
import {
  updateAuthentication,
  updateToken,
  updateAuthorizing,
} from "../../contexts/AuthContext/actions";

const App = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [state, dispatch] = useContext(AuthContext);
  const isAuthenticated = !!localStorage.getItem(ACCESS_TOKEN);
  useEffect(() => {
    dispatch(updateAuthentication(!!localStorage.getItem(ACCESS_TOKEN)));
    dispatch(updateToken(localStorage.getItem(ACCESS_TOKEN)));
    if (isAuthenticated) {
      const fetchData = async () => {
        await authAPI.getCurrentUser(localStorage.getItem(ACCESS_TOKEN));
        // setProfile(responseData);
        setIsAuthorized(true);
        dispatch(updateAuthorizing(false));
        // loginSocketEmit(userId);
      };
      fetchData();
    }
    return () => {
      setIsAuthorized(false);
    };
  }, [isAuthenticated, dispatch]);
  return (
    <Router>
      {isAuthorized ? (
        <Fragment>
          <div>User page</div>
          {/* {isAuthorized ? <div>User page</div> : <div>Loading...</div>} */}
        </Fragment>
      ) : (
        <AuthRoutes />
      )}
    </Router>
  );
};

export default App;
