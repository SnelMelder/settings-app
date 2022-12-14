import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "../authConfig";
import { initializeIcons } from "@fluentui/react";

const msalInstance = new PublicClientApplication(msalConfig);
initializeIcons();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MsalProvider instance={msalInstance}>
    <App />
  </MsalProvider>
);
