import "./app/index.css";
import ReactDOM from "react-dom/client";
import App from "./app/App";

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "../authConfig";
import { initializeIcons } from "@fluentui/react";
import { Provider } from "react-redux";
import { store } from "./app/store";

const msalInstance = new PublicClientApplication(msalConfig);
initializeIcons();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MsalProvider instance={msalInstance}>
    <Provider store={store}>
      <App />
    </Provider>
  </MsalProvider>
);
