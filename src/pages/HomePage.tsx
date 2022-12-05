import { useState, useEffect } from "react";
import { IIconProps, PrimaryButton } from "@fluentui/react";
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
} from "../services/ProjectService";
import { getAllContractors } from "../services/PeopleService";

const addIcon: IIconProps = { iconName: "Add" };

const HomePage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [contractors, setContractors] = useState<Person[]>([]);
  const [panelIsOpen, { setTrue: openPanel, setFalse: closePanel }] =
    useBoolean(false);

  useEffect(() => {
    getAllProjects().then((result) => setProjects(result));
    getAllContractors().then((result) => setContractors(result));
  }, []);

  async function projectSaveHandler(dto: ProjectCreateDto) {
    console.log("Project save handler called");
    const newProject = await createProject(dto);
    setProjects((current) => [...current, newProject]);
  }

  return (
    <>
      <TopBar />

      <ProjectPanel
        isOpen={panelIsOpen}
        dismissPanel={closePanel}
        contractors={contractors}
        mode="create"
        onSave={projectSaveHandler}
      />

      <div className="max-w-5xl mx-auto p-4 my-8">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl">Projecten</h1>
          <PrimaryButton
            onClick={openPanel}
            iconProps={addIcon}
            text="Nieuw Project"
            type="none"
          />
        </div>

        <ProjectList projects={projects} />
      </div>
    </>
  );
};

export default HomePage;
