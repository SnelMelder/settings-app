import { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { DefaultButton, IIconProps, PrimaryButton } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import ProjectPanel from "../components/ProjectPanel";
import TopBar from "../components/TopBar";
import ProjectList from "../components/ProjectList";
import { Project } from "../models/Project";
import { Person } from "../models/Person";
import {
  createProject,
  getAllProjects,
  ProjectCreateDto,
  ProjectUpdateDto,
  deleteProject,
  updateProject,
} from "../services/ProjectService";
import { getAllContractors } from "../services/PeopleService";
import { loginRequest } from "../../authConfig";

const addIcon: IIconProps = { iconName: "Add" };
const trashIcon: IIconProps = { iconName: "Delete" };
const penIcon: IIconProps = { iconName: "PenWorkspace" };

const HomePage = () => {
  const { instance, accounts } = useMsal();

  const [projects, setProjects] = useState<Project[]>([]);
  const [contractors, setContractors] = useState<Person[]>([]);
  const [
    createPanelIsOpen,
    { setTrue: openCreatePanel, setFalse: closeCreatePanel },
  ] = useBoolean(false);
  const [
    updatePanelIsOpen,
    { setTrue: openUpdatePanel, setFalse: closeUpdatePanel },
  ] = useBoolean(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    getToken()
      .then((token) => getAllContractors(token))
      .then((contractors) => setContractors(contractors));

    getToken()
      .then((token) => getAllProjects(token))
      .then((projects) => setProjects(projects));
  }, []);

  async function getToken() {
    const request = {
      ...loginRequest,
      account: accounts[0],
    };

    return instance
      .acquireTokenSilent(request)
      .then((response) => response.accessToken);
  }

  async function projectCreateHandler(dto: ProjectCreateDto) {
    try {
      getToken()
        .then((token) => createProject(dto, token))
        .then((newProject) =>
          setProjects((current) => [...current, newProject])
        );
    } catch (e) {
      console.log(e);
    }
  }

  async function projectUpdateHandler(dto: ProjectUpdateDto) {
    getToken()
      .then((token) => updateProject(dto, token))
      .then((updatedProject) =>
        setProjects((current) => [
          ...current.filter((item) => item.key !== updatedProject.key),
          updatedProject,
        ])
      );
  }

  function projectSelectHandler(project: Project | null) {
    console.log("Project selected...");
    console.log(project);
    setSelectedProject(project);
  }

  async function deleteSelectedProject() {
    if (!selectedProject) {
      throw new Error(
        "A project should be selected when clicking delete button"
      );
    }

    try {
      getToken()
        .then((token) => deleteProject(selectedProject.key, token))
        .then(() =>
          setProjects((current) =>
            current.filter((project) => project.key !== selectedProject.key)
          )
        )
        .then(() => setSelectedProject(null));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <TopBar />

      <ProjectPanel
        isOpen={createPanelIsOpen}
        dismissPanel={closeCreatePanel}
        contractors={contractors}
        mode="create"
        onSave={projectCreateHandler}
      />

      <ProjectPanel
        isOpen={updatePanelIsOpen}
        dismissPanel={closeUpdatePanel}
        contractors={contractors}
        mode="update"
        onSave={projectUpdateHandler}
        project={selectedProject}
      />

      <div className="max-w-5xl mx-auto p-4 my-8">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl">Projecten</h1>
          <PrimaryButton
            onClick={openCreatePanel}
            iconProps={addIcon}
            text="Nieuw Project"
            type="none"
          />
        </div>

        <div className="mt-8">
          <DefaultButton
            text="Verwijderen"
            disabled={!selectedProject}
            iconProps={trashIcon}
            onClick={deleteSelectedProject}
          />

          <DefaultButton
            text="Aanpassen"
            disabled={!selectedProject}
            iconProps={penIcon}
            className="ml-4"
            onClick={openUpdatePanel}
          />
        </div>

        <ProjectList projects={projects} onSelect={projectSelectHandler} />
      </div>
    </>
  );
};

export default HomePage;
