import { useMemo } from "react";
import {
  DetailsList,
  Facepile,
  IColumn,
  SelectionMode,
  Selection,
  Shimmer,
} from "@fluentui/react";
import { Project } from "../../models/Project";
import { useGetProjectsQuery } from "./projectsSlice";
import ContractorsFacepile from "../contractors/ContractorsFacepile";

interface Props {
  onSelect: (project: Project | null) => void;
}

const ProjectList = ({ onSelect }: Props) => {
  const { isSuccess, data, isLoading } = useGetProjectsQuery();

  function renderFacePile(project: Project) {
    return <ContractorsFacepile project={project} />;
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

  if (isLoading) {
    return (
      <>
        <Shimmer />
        <Shimmer width="75%" />
        <Shimmer width="50%" />
      </>
    );
  }

  if (isSuccess) {
    return <DetailsList items={data} columns={columns} selection={selection} />;
  }

  return <p>Unknown error...</p>;
};

export default ProjectList;
