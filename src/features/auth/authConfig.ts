import { apiScopes } from "../api/apiScopes";

export const msalConfig = {
  auth: {
    clientId: "d36a95ca-b349-405a-97ed-305831f4c8d2",
    authority:
      "https://login.microsoftonline.com/b0ad87a1-0f53-4ca9-a2f2-a0e1b926e061",
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: true,
  },
};

export const loginRequest = {
  scopes: apiScopes,
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
