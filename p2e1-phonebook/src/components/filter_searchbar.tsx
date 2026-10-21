import { useState } from "react";

import type { PersonDetails } from "../utils/types";

type FilterSearchBarProps = {
  persons: PersonDetails[];
  setPersonsFiltered: React.Dispatch<React.SetStateAction<PersonDetails[]>>;
};

export default function FilterSearchBar({
  persons,
  setPersonsFiltered,
}: FilterSearchBarProps) {
  const [filterName, setFilterName] = useState("");

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    const currentInput = e.currentTarget.value;
    setFilterName(currentInput);

    const filterResult = persons.filter((person, _) => {
      return person.name.toLowerCase().includes(currentInput.toLowerCase());
    });

    setPersonsFiltered([...filterResult]);
  }

  return <input type="text" value={filterName} onChange={handleTextChange} />;
}
