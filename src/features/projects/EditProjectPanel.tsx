import { useCallback, useEffect, useState } from "react";
import {
  Panel,
  TextField,
  Label,
  PrimaryButton,
  DefaultButton,
  IPersonaProps,
} from "@fluentui/react";
import PeoplePicker from "../../components/PeoplePicker";
import { Person } from "../../models/Person";
import { Project } from "../../models/Project";
import PanelFooter from "../../components/PanelFooter";
import { useUpdateProjectMutation } from "./projectsSlice";

type Props = {
  isOpen: boolean;
  dismissPanel: () => void;
  project?: Project | null;
};

const EditProjectPanel = ({ isOpen, dismissPanel, project }: Props) => {
  const [name, setName] = useState<string>("");
  const [selectedContractors, setSelectedContractors] = useState<Person[]>([]);

  const [updateProject] = useUpdateProjectMutation();

  useEffect(() => {
    if (!project) return;

    setName(project.name);
    setSelectedContractors(project.contractors);
  }, [project]);

  useEffect(() => {}, [isSuccess]);

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

  const isValidState = name.length > 0 && selectedContractors.length > 0;

  const onRenderFooterContent = (
    <PanelFooter onSave={} onCancel={} isLoading={} canSave={isValidState} />
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

export default EditProjectPanel;
