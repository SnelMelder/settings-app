import { PrimaryButton, DefaultButton, Spinner } from "@fluentui/react";

interface Props {
  onSave: () => void;
  onCancel: () => void;
  canSave?: boolean;
  isLoading?: boolean;
}

const PanelFooter = ({
  onSave,
  onCancel,
  isLoading = false,
  canSave = true,
}: Props) => (
  <>
    <PrimaryButton
      className="mr-2"
      type="none"
      onClick={onSave}
      disabled={!canSave}
    >
      {isLoading ? <Spinner /> : "Opslaan"}
    </PrimaryButton>

    <DefaultButton onClick={onCancel}>Annuleren</DefaultButton>
  </>
);

export default PanelFooter;
