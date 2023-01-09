import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalInstance } from "../auth/msalInstance";
import { apiScopes } from "./apiScopes";

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

const getAccessToken = async () => {
  return msalInstance
    .acquireTokenSilent({
      account: msalInstance.getAllAccounts()[0],
      scopes: apiScopes,
    })
    .then((tokenResponse) => tokenResponse.accessToken)
    .catch((error) => {
      console.error(error);
      return null;
    });
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers) => {
      const token = await getAccessToken();

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Project", "Contractor"],
  endpoints: (builder) => ({}),
});
