export const msalConfig = {
  auth: {
    clientId: "d36a95ca-b349-405a-97ed-305831f4c8d2",
    authority:
      "https://login.microsoftonline.com/b0ad87a1-0f53-4ca9-a2f2-a0e1b926e061", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ["User.Read"],
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
