import { Project } from "../../models/Project";
import { apiSlice } from "../api/apiSlice";

interface ProjectReadDto {
  _id: string;
  name: string;
  contractors: string[];
}

interface ProjectCreateDto {
  name: string;
  contractors: string[];
}

interface ProjectUpdateDto {
  _id: string;
  name: string;
  contractors: string[];
}

export const projectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], void>({
      query: () => "/locations",
      transformResponse: (rawResponse: ProjectReadDto[]) =>
        rawResponse.map((item) => ({
          key: item._id,
          name: item.name,
          contractorIDs: item.contractors,
        })),
      providesTags: ["Project"],
    }),
    addNewProject: builder.mutation({
      query: (project: ProjectCreateDto) => ({
        url: "/locations",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Project"],
    }),
    updateProject: builder.mutation({
      query: (project: ProjectUpdateDto) => ({
        url: `locations/${project._id}`,
        method: "PUT",
        body: project,
      }),
      invalidatesTags: ["Project"],
    }),
    deleteProject: builder.mutation({
      query: ({ key: id }: Project) => ({
        url: `/locations/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useAddNewProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApiSlice;
