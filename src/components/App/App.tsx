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
import { ProfileProvider } from "../../contexts/ProfileContext/profileContext";
import { AppSpinner } from "../common/FormControls";

const App = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [state, dispatch] = useContext(AuthContext);
  const isAuthenticated = !!localStorage.getItem(ACCESS_TOKEN);
  useEffect(() => {
    dispatch(updateAuthentication(!!localStorage.getItem(ACCESS_TOKEN)));
    dispatch(updateToken(localStorage.getItem(ACCESS_TOKEN)));
    if (isAuthenticated) {
      const fetchData = async () => {
        const user = await authAPI.getCurrentUser(
          localStorage.getItem(ACCESS_TOKEN)
        );
        console.log(user);
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
      {isAuthenticated ? (
        <Fragment>
          {isAuthorized ? (
            <ProfileProvider>
              {/* There must be component with profile routes, 
              instead the div with User Page */}
              <div>User page</div>
            </ProfileProvider>
          ) : (
            <AppSpinner />
          )}
        </Fragment>
      ) : (
        <AuthRoutes />
      )}
    </Router>
  );
};

export default App;
