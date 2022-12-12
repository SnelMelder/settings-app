import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { testProjects } from "../mockdata/testProjects";
import { Person } from "../models/Person";
import { Project } from "../models/Project";
import { getAllContractors } from "./PeopleService";

export interface ProjectReadDto {
  _id: string;
  name: string;
  contractors: string[];
}

export interface ProjectCreateDto {
  name: string;
  contractors: string[];
}

export interface ProjectUpdateDto {
  _id: string;
  name: string;
  contractors: string[];
}

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

export async function getAllProjects(accessToken: string) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);

  const contractors = await getAllContractors(accessToken);

  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(`${baseUrl}/locations`, options)
    .then((res) => res.json())
    .then((data) => {
      const projectsData: ProjectReadDto[] = data;

      return projectsData.map(
        (item) =>
          new Project(
            item._id,
            item.name,
            contractors.filter((person) =>
              item.contractors.includes(person.key)
            )
          )
      );
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}

export async function createProject(
  dto: ProjectCreateDto,
  accessToken: string
) {
  try {
    // const headers = new Headers();
    // const bearer = `Bearer ${accessToken}`;

    // headers.append("Authorization", bearer);

    // const options = {
    //   method: "POST",
    //   headers: headers,
    //   body: JSON.stringify(dto),
    // };

    // await fetch(`${baseUrl}/locations`, options);
    console.log(dto);

    try {
      await axios.post(`${baseUrl}/locations`, dto, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (e) {
      console.log(e);
    }

    const contractors = await getAllContractors(accessToken);

    const selectedContractors = contractors.filter((contractor) =>
      dto.contractors.includes(contractor.key)
    );

    const project = new Project(uuidv4(), dto.name, selectedContractors);

    return project;
  } catch (e) {
    throw e;
  }
}

export async function deleteProject(projectId: string, accessToken: string) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);

  const options = {
    method: "DELETE",
    headers: headers,
  };

  await fetch(`${baseUrl}/locations/${projectId}`, options);
}

export async function updateProject(
  dto: ProjectUpdateDto,
  accessToken: string
) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);

  const options = {
    method: "DELETE",
    headers: headers,
    body: JSON.stringify(dto),
  };

  await fetch(`${baseUrl}/locations/${dto._id}`, options);

  const allContractors = await getAllContractors(accessToken);
  const contractorsForProject = allContractors.filter((contractor) =>
    dto.contractors.includes(contractor.key)
  );

  return new Project(dto._id, dto.name, contractorsForProject);
}
