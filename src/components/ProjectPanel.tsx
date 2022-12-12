import { useCallback, useEffect, useState } from "react";
import {
  Panel,
  TextField,
  Label,
  PrimaryButton,
  DefaultButton,
  IPersonaProps,
} from "@fluentui/react";
import PeoplePicker from "./PeoplePicker";
import { Person } from "../models/Person";
import { ProjectCreateDto, ProjectUpdateDto } from "../services/ProjectService";
import { Project } from "../models/Project";

type CreateProps = {
  mode: "create";
  onSave: (project: ProjectCreateDto) => Promise<void>;
};

type UpdateProps = {
  mode: "update";
  onSave: (project: ProjectUpdateDto) => Promise<void>;
};

type DefaultProps = {
  isOpen: boolean;
  dismissPanel: () => void;
  contractors: Person[];
  project?: Project | null;
};

type Props = (CreateProps | UpdateProps) & DefaultProps;

const ProjectPanel = ({
  isOpen,
  dismissPanel,
  contractors,
  onSave,
  mode,
  project,
}: Props) => {
  const [name, setName] = useState<string>("");
  const [selectedContractors, setSelectedContractors] = useState<Person[]>([]);

  useEffect(() => {
    if (!project) return;

    setName(project.name);
    setSelectedContractors(project.contractors);
  }, [project]);

  function close() {
    resetInputFields();
    dismissPanel();
  }

  function updateName(
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newName?: string
  ) {
    if (newName) {
      setName(newName);
    } else {
      setName("");
    }
  }

  function updateSelectedContractors(items?: IPersonaProps[] | undefined) {
    setSelectedContractors(items as Person[]);
  }

  async function save() {
    console.log("Save function in project panel called");
    if (name === undefined) {
      throw new Error("Project name should be defined before saving");
    }

    if (selectedContractors === undefined || selectedContractors.length === 0) {
      throw new Error("At least one contractor should be selected");
    }

    if (mode === "create") {
      console.log("Mode === create");
      onSave({
        name,
        contractors: selectedContractors.map((contractor) => contractor.key),
      });
    } else {
      if (!project) {
        throw new Error("Project should be defined, because mode === update");
      }

      onSave({
        _id: project.key,
        name,
        contractors: selectedContractors.map((contractor) => contractor.key),
      });
    }

    close();
  }

  function resetInputFields() {
    setName("");
    setSelectedContractors([]);
  }

  const isValidState = name.length > 0 && selectedContractors.length > 0;

  const onRenderFooterContent = useCallback(
    () => (
      <div>
        <PrimaryButton
          className="mr-2"
          type="none"
          onClick={save}
          disabled={!isValidState}
        >
          Opslaan
        </PrimaryButton>
        <DefaultButton onClick={close}>Annuleren</DefaultButton>
      </div>
    ),
    [close]
  );

  return (
    <Panel
      headerText="Nieuw project"
      isOpen={isOpen}
      onDismiss={close}
      onRenderFooterContent={onRenderFooterContent}
      isFooterAtBottom={true}
    >
      <TextField
        label="Projectnaam: "
        required
        value={name}
        onChange={updateName}
      />
      <div className="mt-1">
        <Label>Uitvoerder(s):</Label>
        <PeoplePicker
          onChange={updateSelectedContractors}
          people={contractors}
          selectedPeople={selectedContractors}
        />
      </div>
    </Panel>
  );
};

export default ProjectPanel;
