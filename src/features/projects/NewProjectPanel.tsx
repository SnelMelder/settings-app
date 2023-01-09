import { useEffect, useState } from "react";
import { Panel, TextField, Label, IPersona, Shimmer } from "@fluentui/react";
import { Contractor } from "../contractors/Contractor";
import { useAddNewProjectMutation } from "./projectsSlice";
import { useGetContractorsQuery } from "../contractors/contractorsSlice";
import PanelFooter from "../../common/PanelFooter";
import ContractorsPicker from "../contractors/ContractorsPicker";

type Props = {
  isOpen: boolean;
  dismissPanel: () => void;
};

const NewProjectPanel = ({ isOpen, dismissPanel }: Props) => {
  const [name, setName] = useState<string>("");
  const [selectedContractorIDs, setSelectedContractorIDs] = useState<string[]>(
    []
  );

  const [addNewProject, { isSuccess, isLoading }] = useAddNewProjectMutation();
  const { data: contractors } = useGetContractorsQuery();

  useEffect(() => {
    if (isSuccess) {
      close();
    }
  }, [isSuccess]);

  const close = () => {
    resetInputFields();
    dismissPanel();
  };

  // Form input
  const nameChangeHandler = (_: any, newName?: string) =>
    setName(newName || "");

  const resetInputFields = () => {
    setName("");
    setSelectedContractorIDs([]);
  };

  function contractorsPickerChangeHandler(contractorIDs: string[]) {
    setSelectedContractorIDs(contractorIDs);
  }

  const isValidState = name.length > 0 && selectedContractorIDs.length > 0;

  // Actions
  const closeBtnClickHandler = () => close();

  const saveBtnClickHandler = () => {
    if (isLoading) return;

    addNewProject({
      name,
      contractors: selectedContractorIDs,
    });
  };

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
          <ContractorsPicker
            onChange={contractorsPickerChangeHandler}
            selectedContractorsIDs={selectedContractorIDs}
          />
        ) : (
          <Shimmer />
        )}
      </div>
    </Panel>
  );
};

export default NewProjectPanel;
