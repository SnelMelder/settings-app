import { IIconProps, PrimaryButton } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import NewProjectPanel from "../components/NewProjectPanel";
import TopBar from "../components/TopBar";

const addIcon: IIconProps = { iconName: "Add" };

const HomePage = () => {
  const [
    newProjectPanelIsOpen,
    { setTrue: openNewProjectPanel, setFalse: dismissNewProjectPanel },
  ] = useBoolean(false);

  return (
    <>
      <TopBar />

      <NewProjectPanel
        isOpen={newProjectPanelIsOpen}
        dismissPanel={dismissNewProjectPanel}
      />

      <div className="max-w-5xl mx-auto p-4 my-8">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl">Projecten</h1>
          <PrimaryButton
            onClick={openNewProjectPanel}
            iconProps={addIcon}
            text="Nieuw Project"
            type="none"
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
