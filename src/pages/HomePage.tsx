import { useState, useEffect } from "react";
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

const addIcon: IIconProps = { iconName: "Add" };
const trashIcon: IIconProps = { iconName: "Delete" };
const penIcon: IIconProps = { iconName: "PenWorkspace" };

const HomePage = () => {
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
    getAllProjects().then((result) => setProjects(result));
    getAllContractors().then((result) => setContractors(result));
  }, []);

  async function projectCreateHandler(dto: ProjectCreateDto) {
    try {
      const newProject = await createProject(dto);
      setProjects((current) => [...current, newProject]);
    } catch (e) {
      console.log(e);
    }
  }

  async function projectUpdateHandler(dto: ProjectUpdateDto) {
    console.log("project update handler");
    const project = await updateProject(dto);
    setProjects((current) => [
      ...current.filter((item) => item.key !== project.key),
      project,
    ]);
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
      await deleteProject(selectedProject.key);
      setProjects((current) =>
        current.filter((project) => project.key !== selectedProject.key)
      );
      setSelectedProject(null);
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
