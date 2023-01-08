import { Contractor } from "./Contractor";
import { apiSlice } from "../api/apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

interface PersonReadDto {
  id: string;
  imageInitials: string;
  name: string;
}

export const contractorsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContractors: builder.query<Contractor[], void>({
      query: () => "/users/contractors",
      transformResponse: (rawResult: PersonReadDto[]) =>
        rawResult.map((item) => ({
          key: item.id,
          imageInitials: item.imageInitials,
          text: item.name,
        })),
      providesTags: ["Contractor"],
    }),
  }),
});

export const { useGetContractorsQuery } = contractorsApiSlice;
