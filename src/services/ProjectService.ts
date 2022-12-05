import { v4 as uuidv4 } from "uuid";
import { testProjects } from "../mockdata/testProjects";
import { Project } from "../models/Project";
import { getAllContractors } from "./PeopleService";

export interface ProjectReadDto {
  id: string;
  name: string;
  contractors: string[];
}

export interface ProjectCreateDto {
  name: string;
  contractorIDs: string[];
}

export interface ProjectUpdateDto {
  id: string;
  name: string;
  contractorIDs: string[];
}

export async function getAllProjects() {
  return testProjects;
}

export async function createProject(dto: ProjectCreateDto) {
  try {
    const contractors = await getAllContractors();

    const selectedContractors = contractors.filter((contractor) =>
      dto.contractorIDs.includes(contractor.key)
    );

    const project = new Project(uuidv4(), dto.name, selectedContractors);

    return project;
  } catch (e) {
    throw e;
  }
}

export async function deleteProject(projectId: string) {
  console.log("Deleting project...");
  return;
}

export async function updateProject(dto: ProjectUpdateDto) {
  const allContractors = await getAllContractors();
  const contractorsForProject = allContractors.filter((contractor) =>
    dto.contractorIDs.includes(contractor.key)
  );
  return new Project(dto.id, dto.name, contractorsForProject);
}
