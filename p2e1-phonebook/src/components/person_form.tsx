import { useState } from "react";

type PersonFormProp = {
  handleFormSubmit: (newName: string, newNumber: string) => void;
};

export default function PersonForm({ handleFormSubmit }: PersonFormProp) {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  return (
    <form
      onSubmit={(event: React.SubmitEvent) => {
        event.preventDefault();
        handleFormSubmit(newName, newNumber);
      }}
    >
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
