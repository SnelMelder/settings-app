import { useMemo } from "react";
import {
  DetailsList,
  DetailsListBase,
  Facepile,
  IColumn,
  SelectionMode,
  Selection,
} from "@fluentui/react";
import { Project } from "../models/Project";

interface Props {
  projects: Project[];
  onSelect: (project: Project | null) => void;
}

const ProjectList = ({ projects, onSelect }: Props) => {
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

  const selection = useMemo(
    () =>
      new Selection({
        onSelectionChanged: () => {
          const selectedProjects = selection.getSelection() as Project[];
          onSelect(selectedProjects.length > 0 ? selectedProjects[0] : null);
        },
        selectionMode: SelectionMode.single,
      }),
    []
  );

  return (
    <DetailsList items={projects} columns={columns} selection={selection} />
  );
};

export default ProjectList;
