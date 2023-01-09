import "./app/index.css";
import ReactDOM from "react-dom/client";
import App from "./app/App";

import { MsalProvider } from "@azure/msal-react";
import { initializeIcons } from "@fluentui/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { msalInstance } from "./features/auth/msalInstance";

initializeIcons();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MsalProvider instance={msalInstance}>
    <Provider store={store}>
      <App />
    </Provider>
  </MsalProvider>
);
