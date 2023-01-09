import { useState } from "react";
import { DefaultButton, IIconProps, PrimaryButton } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import NewProjectPanel from "./NewProjectPanel";
import EditProjectPanel from "./EditProjectPanel";
import TopBar from "../navigation/TopBar";
import ProjectList from "./ProjectList";
import { Project } from "./Project";
import { useDeleteProjectMutation } from "./projectsSlice";

const addIcon: IIconProps = { iconName: "Add" };
const trashIcon: IIconProps = { iconName: "Delete" };
const penIcon: IIconProps = { iconName: "PenWorkspace" };

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [
    createPanelIsOpen,
    { setTrue: openCreatePanel, setFalse: closeCreatePanel },
  ] = useBoolean(false);

  const [
    updatePanelIsOpen,
    { setTrue: openUpdatePanel, setFalse: closeUpdatePanel },
  ] = useBoolean(false);

  const [deleteProject] = useDeleteProjectMutation();

  const createBtnClickHandler = () => openCreatePanel();
  const updateBtnClickHandler = () => openUpdatePanel();
  const deleteBtnClickHandler = () => deleteProject(selectedProject!);

  const projectSelectHandler = (project: Project | null) =>
    setSelectedProject(project);

  return (
    <>
      <TopBar />

      <NewProjectPanel
        isOpen={createPanelIsOpen}
        dismissPanel={closeCreatePanel}
      />

      <EditProjectPanel
        isOpen={updatePanelIsOpen}
        dismissPanel={closeUpdatePanel}
        project={selectedProject}
      />

      <div className="max-w-5xl mx-auto p-4 my-8">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl">Projecten</h1>
          <PrimaryButton
            onClick={createBtnClickHandler}
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
            onClick={deleteBtnClickHandler}
          />

          <DefaultButton
            text="Aanpassen"
            disabled={!selectedProject}
            iconProps={penIcon}
            className="ml-4"
            onClick={updateBtnClickHandler}
          />
        </div>

        <ProjectList onSelect={projectSelectHandler} />
      </div>
    </>
  );
};

export default ProjectsPage;
