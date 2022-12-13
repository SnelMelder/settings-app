import { Person } from "../../models/Person";
import { apiSlice } from "../api/apiSlice";

interface PersonReadDto {
  id: string;
  imageInitials: string;
  name: string;
}

export const contractorsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContractors: builder.query<Person[], void>({
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
