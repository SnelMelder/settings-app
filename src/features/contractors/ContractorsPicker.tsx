import { useEffect, useState } from "react";
import PeoplePicker from "../../common/PeoplePicker";
import { Contractor } from "./Contractor";
import { useGetContractorsQuery } from "./contractorsSlice";
import {
  IPersonaProps,
  Spinner,
  MessageBarType,
  MessageBar,
} from "@fluentui/react";

interface Props {
  onChange: (selectedContractorIDs: string[]) => void;
  selectedContractorsIDs: string[];
}

const ContractorsPicker = ({ onChange, selectedContractorsIDs }: Props) => {
  const [selectedContractors, setSelectedContractors] = useState<Contractor[]>(
    []
  );

  const {
    data: allContractors,
    isLoading,
    isSuccess,
    isUninitialized,
    isError,
  } = useGetContractorsQuery();

  useEffect(() => {
    if (isSuccess) {
      setSelectedContractors(
        allContractors.filter((contractor) =>
          selectedContractorsIDs.includes(contractor.key)
        )
      );
    }
  }, [isSuccess]);

  const peoplePickerChangeHandler = (items?: IPersonaProps[]) => {
    const contractors = items as Contractor[];
    setSelectedContractors(contractors);
    onChange(contractors.map((contractor) => contractor.key));
  };

  if (isLoading || isUninitialized) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <MessageBar className="mt-4" messageBarType={MessageBarType.error}>
        Er ging iets mis met het ophalen van de uitvoerders.
      </MessageBar>
    );
  }

  return (
    <PeoplePicker
      onChange={peoplePickerChangeHandler}
      people={allContractors}
      selectedPeople={selectedContractors}
    />
  );
};

export default ContractorsPicker;
