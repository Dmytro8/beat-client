import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { App } from "./components/App";
import { AuthProvider } from "./contexts/AuthContext/AuthContext";
import { ProfileProvider } from "./contexts/ProfileContext/ProfileContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ProfileProvider>
        <App />
      </ProfileProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
