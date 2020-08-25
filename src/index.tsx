import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { App } from "./components/App";
// import { AuthProvider } from "./contexts/AuthContext/AuthProvider";
import { ProfileProvider } from "./contexts/ProfileContext/ProfileContext";
import { AuthProvider } from "./contexts/AuthContext/AuthContext";
import { PlayerProvider } from "./contexts/PlayerContext/PlayerContext";

ReactDOM.render(
  <AuthProvider>
    <ProfileProvider>
      <PlayerProvider>
        <App />
      </PlayerProvider>
    </ProfileProvider>
  </AuthProvider>,
  document.getElementById("root")
);
