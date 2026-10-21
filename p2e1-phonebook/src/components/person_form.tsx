import { nanoid } from "nanoid";
import { useState } from "react";

import type { PersonDetails } from "../utils/types";

type PersonFormProp = {
  persons: PersonDetails[];
  setPersons: React.Dispatch<React.SetStateAction<PersonDetails[]>>;
};

export default function PersonForm({ persons, setPersons }: PersonFormProp) {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  function handleFormSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    if (newName.trim() === "" || newNumber.trim() === "") {
      alert("Input fields should not be blank.");
      return;
    }

    const newPerson = {
      id: nanoid(),
      name: newName.trim(),
      phone: newNumber.trim(),
    } as PersonDetails;

    if (persons.find((person) => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }

    setPersons([...persons, newPerson]);
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="name">
        Name:
        <input
          id="name"
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.currentTarget.value)}
        />
      </label>

      <label htmlFor="number">
        PhoneNumber:
        <input
          id="number"
          type="text"
          value={newNumber}
          onChange={(e) => setNewNumber(e.currentTarget.value)}
        />
      </label>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
}
