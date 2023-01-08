import { useMemo } from "react";
import {
  DetailsList,
  Facepile,
  IColumn,
  SelectionMode,
  Selection,
  Shimmer,
  MessageBar,
  MessageBarType,
} from "@fluentui/react";
import { Project } from "./Project";
import { useGetProjectsQuery } from "./projectsSlice";
import ContractorsFacepile from "../contractors/ContractorsFacepile";

interface Props {
  onSelect: (project: Project | null) => void;
}

const ProjectList = ({ onSelect }: Props) => {
  const { data, isLoading, isError, isUninitialized } = useGetProjectsQuery();

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

  if (isLoading || isUninitialized) {
    return (
      <div className="mt-4">
        <Shimmer className="mt-3" />
        <Shimmer className="mt-3" width="75%" />
        <Shimmer className="mt-3" width="50%" />
      </div>
    );
  }

  if (isError) {
    return (
      <MessageBar className="mt-4" messageBarType={MessageBarType.error}>
        Er ging iets mis met het ophalen van de projecten.
      </MessageBar>
    );
  }

  return <DetailsList items={data} columns={columns} selection={selection} />;
};

export default ProjectList;
