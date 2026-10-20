import { useState } from "react";

import "./App.css";
import { nanoid } from "nanoid";

type PersonDetails = {
  id: string;
  name: string;
  phone: string;
};

const initialPhoneBookData = [
  {
    id: nanoid(),
    name: "Arto Hellas",
    phone: "040-123456",
  },
  {
    id: nanoid(),
    name: "Ada Lovelace",
    phone: "39-44-5323523",
  },
  {
    id: nanoid(),
    name: "Dan Abramov",
    phone: "12-43-234345",
  },
  {
    id: nanoid(),
    name: "Mary Poppendieck",
    phone: "39-23-6423122",
  },
] as PersonDetails[];

export default function App() {
  const [persons, setPersons] = useState<PersonDetails[]>(initialPhoneBookData);
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

type FilterSearchBarProps = {
  persons: PersonDetails[];
  setPersonsFiltered: React.Dispatch<React.SetStateAction<PersonDetails[]>>;
};

function FilterSearchBar({
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

type PersonFormProp = {
  persons: PersonDetails[];
  setPersons: React.Dispatch<React.SetStateAction<PersonDetails[]>>;
};

function PersonForm({ persons, setPersons }: PersonFormProp) {
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

type PersonDisplayProps = {
  persons: PersonDetails[];
  personsFiltered: PersonDetails[];
};

function PersonDisplay({ persons, personsFiltered }: PersonDisplayProps) {
  const currentPersonList = !personsFiltered ? persons : personsFiltered;

  return (
    <ul className="person__display">
      {currentPersonList.map((person, _) => (
        <li key={person.id}>
          {person.name} --- {person.phone}
        </li>
      ))}
    </ul>
  );
}
