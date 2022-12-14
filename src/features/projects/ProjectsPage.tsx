import { useState } from "react";
import { DefaultButton, IIconProps, PrimaryButton } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import ProjectPanel from "./NewProjectPanel";
import TopBar from "../../common/TopBar";
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

  const projectSelectHandler = (p: Project | null) => setSelectedProject(p);

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
            onClick={deleteBtnClickHandler}
          />

          <DefaultButton
            text="Aanpassen"
            disabled={!selectedProject}
            iconProps={penIcon}
            className="ml-4"
            onClick={openUpdatePanel}
          />
        </div>

        <ProjectList onSelect={projectSelectHandler} />
      </div>
    </>
  );
};

export default ProjectsPage;
