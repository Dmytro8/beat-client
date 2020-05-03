import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthRoutes } from "../../routes/AuthRoutes";
import { useAuth } from "../../hooks/authHook";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { token, login, logout, userId } = useAuth();
  // const isAuthenticated = !!token;
  return (
    <Router>{isAuthenticated ? <div>User Page</div> : <AuthRoutes />}</Router>
  );
};

export default App;
