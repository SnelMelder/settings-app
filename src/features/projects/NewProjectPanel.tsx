import { useEffect, useState } from "react";
import { Panel, TextField, Label, IPersona, Shimmer } from "@fluentui/react";
import PeoplePicker from "../../components/PeoplePicker";
import { Person } from "../../models/Person";
import { useAddNewProjectMutation } from "./projectsSlice";
import { useGetContractorsQuery } from "../contractors/contractorsSlice";
import PanelFooter from "../../components/PanelFooter";

type Props = {
  isOpen: boolean;
  dismissPanel: () => void;
};

const NewProjectPanel = ({ isOpen, dismissPanel }: Props) => {
  const [name, setName] = useState<string>("");
  const [selectedContractors, setSelectedContractors] = useState<Person[]>([]);

  const [addNewProject, { isSuccess, isLoading }] = useAddNewProjectMutation();
  const { data: contractors } = useGetContractorsQuery();

  useEffect(() => {
    if (isSuccess) {
      dismissPanel();
    }
  }, [isSuccess]);

  // Form input
  const nameChangeHandler = (_: any, newName?: string) =>
    setName(newName || "");

  const peoplePickerChangeHandler = (items?: IPersona[]) =>
    setSelectedContractors(items as Person[]);

  const isValidState = name.length > 0 && selectedContractors.length > 0;

  // Actions
  const closeBtnClickHandler = () => dismissPanel();

  const saveBtnClickHandler = () =>
    addNewProject({
      name,
      contractors: selectedContractors.map((item) => item.key),
    });

  const onRenderFooterContent = () => (
    <PanelFooter
      onSave={saveBtnClickHandler}
      onCancel={closeBtnClickHandler}
      canSave={isValidState}
      isLoading={isLoading}
    />
  );

  return (
    <Panel
      headerText="Nieuw project"
      isOpen={isOpen}
      onDismiss={closeBtnClickHandler}
      onRenderFooterContent={onRenderFooterContent}
      isFooterAtBottom={true}
    >
      <TextField
        label="Projectnaam: "
        required
        value={name}
        onChange={nameChangeHandler}
      />

      <div className="mt-1">
        <Label>Uitvoerder(s):</Label>
        {contractors ? (
          <PeoplePicker
            onChange={peoplePickerChangeHandler}
            people={contractors}
            selectedPeople={selectedContractors}
          />
        ) : (
          <Shimmer />
        )}
      </div>
    </Panel>
  );
};

export default NewProjectPanel;
