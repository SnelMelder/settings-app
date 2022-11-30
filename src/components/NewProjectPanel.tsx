import { Panel, TextField } from "@fluentui/react";

interface Props {
  isOpen: boolean;
  dismissPanel: () => void;
}

const NewProjectPanel = ({ isOpen, dismissPanel }: Props) => {
  function close() {
    console.log("Closing panel...");
    dismissPanel();
  }

  return (
    <Panel headerText="Nieuw project" isOpen={isOpen} onDismiss={close}>
      <TextField label="Projectnaam " required />
    </Panel>
  );
};

export default NewProjectPanel;
