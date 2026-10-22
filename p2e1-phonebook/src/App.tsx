import { useEffect, useState } from "react";
import axios from "axios";
import personService from "./services/persons";

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

  useEffect(() => {
    personService.all().then;
    axios
      .get<PersonDetails[]>("http://localhost:3000/persons")
      .then((res) => res.data)
      .then((allPersons) => {
        console.log(allPersons);
        setPersons(allPersons);
        setPersonsFiltered(allPersons);
      });
  }, []);

  async function handleFormSubmit(newName: string, newNumber: string) {
    if (newName.trim() === "" || newNumber.trim() === "") {
      alert("Input fields should not be blank.");
      return;
    }

    const newPerson = {
      name: newName.trim(),
      phone: newNumber.trim(),
    } as PersonDetails;

    if (persons.find((person) => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }

    personService.add(newPerson).then((newlyAddedPerson) => {
      console.log(newlyAddedPerson);
      const newPersons = [...persons, newlyAddedPerson];
      setPersons(newPersons);
      setPersonsFiltered(newPersons);
    });
  }

  return (
    <main>
      <h2>Phonebook</h2>
      <PersonForm handleFormSubmit={handleFormSubmit} />

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
