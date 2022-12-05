import { DetailsList, Facepile, IColumn } from "@fluentui/react";
import { Project } from "../models/Project";

interface Props {
  projects: Project[];
}

const ProjectList = ({ projects }: Props) => {
  function renderFacePile(project: Project) {
    return <Facepile personas={project.contractors} />;
  }

  const columns: IColumn[] = [
    { key: "nameColumn", name: "Naam", fieldName: "name", minWidth: 200 },
    {
      key: "contractorsColumn",
      name: "Uitvoerders",
      fieldName: "contractors",
      minWidth: 300,
      onRender: renderFacePile,
    },
  ];

  return <DetailsList items={projects} columns={columns} />;
};

export default ProjectList;
