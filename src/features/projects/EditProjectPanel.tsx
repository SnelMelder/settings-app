import { useCallback, useEffect, useState } from "react";
import {
  Panel,
  TextField,
  Label,
  PrimaryButton,
  DefaultButton,
  IPersonaProps,
  MessageBar,
  MessageBarType,
} from "@fluentui/react";
import PeoplePicker from "../../common/PeoplePicker";
import { Contractor } from "../contractors/Contractor";
import { Project } from "./Project";
import PanelFooter from "../../common/PanelFooter";
import { useUpdateProjectMutation } from "./projectsSlice";
import { useGetContractorsQuery } from "../contractors/contractorsSlice";
import ContractorsPicker from "../contractors/ContractorsPicker";

type Props = {
  isOpen: boolean;
  dismissPanel: () => void;
  project?: Project | null;
};

const EditProjectPanel = ({ isOpen, dismissPanel, project }: Props) => {
  if (!project) return <></>;

  const [name, setName] = useState<string>("");
  const [selectedContractorIDs, setSelectedContractorIDs] = useState<string[]>(
    []
  );

  const [updateProject, { isSuccess, isLoading, isError }] =
    useUpdateProjectMutation();

  useEffect(() => {
    close();
  }, [isSuccess]);

  useEffect(() => {
    setName(project.name);
    setSelectedContractorIDs(project.contractorIDs);
  }, [project, isOpen]);

  function nameInputChangeHandler(_: any, newName?: string) {
    setName(newName || "");
  }

  function contractorsPickerChangeHandler(contractorIDs: string[]) {
    console.log(contractorIDs);
    setSelectedContractorIDs(contractorIDs);
  }

  const close = () => {
    resetInputFields();
    dismissPanel();
  };

  const resetInputFields = () => {
    setName("");
    setSelectedContractorIDs([]);
  };

  const isValidState = name.length > 0 && selectedContractorIDs.length > 0;

  const cancelBtnClickHandler = () => close();

  const saveBtnClickHandler = () => {
    if (isLoading) return;

    updateProject({
      _id: project.key,
      name,
      contractors: selectedContractorIDs,
    });
  };

  const onRenderFooterContent = () => (
    <PanelFooter
      onSave={saveBtnClickHandler}
      onCancel={cancelBtnClickHandler}
      isLoading={isLoading}
      canSave={isValidState}
    />
  );

  return (
    <Panel
      headerText="Nieuw project"
      isOpen={isOpen}
      onDismiss={close}
      onRenderFooterContent={onRenderFooterContent}
      isFooterAtBottom={true}
    >
      {isError && (
        <MessageBar className="mt-2" messageBarType={MessageBarType.error}>
          Er ging iets mis bij het opslaan.
        </MessageBar>
      )}
      <TextField
        label="Projectnaam: "
        required
        value={name}
        onChange={nameInputChangeHandler}
      />
      <div className="mt-1 mb-2">
        <Label>Uitvoerder(s):</Label>
        <ContractorsPicker
          onChange={contractorsPickerChangeHandler}
          selectedContractorsIDs={selectedContractorIDs}
        />
      </div>
    </Panel>
  );
};

export default EditProjectPanel;
