import { IPersonaProps } from "@fluentui/react/lib/Persona";
import {
  IBasePickerSuggestionsProps,
  NormalPeoplePicker,
} from "@fluentui/react/lib/Pickers";

const suggestionProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: "Voorgestelde Personen",
  noResultsFoundText: "Geen resultaten gevonden",
  loadingText: "Laden...",
  showRemoveButtons: true,
};

interface Props {
  onChange: (items?: IPersonaProps[] | undefined) => void;
  people: IPersonaProps[];
}

export const PeoplePicker = ({ people, onChange }: Props) => {
  const onFilterChanged = (
    filterText: string,
    currentPersonas?: IPersonaProps[],
    limitResults?: number
  ): IPersonaProps[] | Promise<IPersonaProps[]> => {
    if (!currentPersonas) {
      return people;
    }

    if (filterText) {
      let filteredPersonas: IPersonaProps[] = filterPersonasByText(filterText);

      console.log(filteredPersonas, currentPersonas);
      filteredPersonas = removeDuplicates(filteredPersonas, currentPersonas);

      return filteredPersonas;
    } else {
      return [];
    }
  };

  const getPeopleWithoutDuplicates = (
    currentPersonas?: IPersonaProps[]
  ): IPersonaProps[] | Promise<IPersonaProps[]> => {
    if (!currentPersonas) {
      return people;
    }

    return removeDuplicates(people, currentPersonas);
  };

  const filterPersonasByText = (filterText: string): IPersonaProps[] => {
    return people.filter((item) =>
      doesTextStartWith(item.text as string, filterText)
    );
  };

  return (
    <NormalPeoplePicker
      onResolveSuggestions={onFilterChanged}
      onEmptyInputFocus={getPeopleWithoutDuplicates}
      getTextFromItem={getTextFromItem}
      pickerSuggestionsProps={suggestionProps}
      className={"ms-PeoplePicker"}
      onChange={onChange}
    />
  );
};

function doesTextStartWith(text: string, filterText: string): boolean {
  return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
}

function removeDuplicates(
  personas: IPersonaProps[],
  possibleDupes: IPersonaProps[]
) {
  return personas.filter(
    (persona) => !listContainsPersona(persona, possibleDupes)
  );
}

function listContainsPersona(
  persona: IPersonaProps,
  personas: IPersonaProps[]
) {
  if (!personas || !personas.length || personas.length === 0) {
    return false;
  }
  return personas.filter((item) => item.text === persona.text).length > 0;
}

function getTextFromItem(persona: IPersonaProps): string {
  return persona.text as string;
}

export default PeoplePicker;
