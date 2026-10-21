import { useState } from "react";

import type { PersonDetails } from "./utils/types";
import PersonForm from "./components/person_form";
import FilterSearchBar from "./components/filter_searchbar";
import PersonDisplay from "./components/person_display";

import "./App.css";

export default function App() {
  const [persons, setPersons] = useState<PersonDetails[]>([]);
  const [personsFiltered, setPersonsFiltered] = useState<PersonDetails[]>([
    ...persons,
  ]);

  return (
    <main>
      <h2>Phonebook</h2>
      <PersonForm persons={persons} setPersons={setPersons} />

      <h2>Search the phonebook for name: </h2>
      <FilterSearchBar
        persons={persons}
        setPersonsFiltered={setPersonsFiltered}
      />

      <h2>List of numbers:</h2>
      <PersonDisplay persons={persons} personsFiltered={personsFiltered} />
    </main>
  );
}
