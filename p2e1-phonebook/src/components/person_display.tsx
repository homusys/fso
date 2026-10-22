import { useState } from "react";
import type { PersonDetails } from "../utils/types";

type PersonDisplayProps = {
  personsToDisplay: PersonDetails[];
  handleOnSave: (id: string, newName: string, newPhone: string) => void;
  handleOnDelete: (id: string) => void;
};

export default function PersonDisplay({
  personsToDisplay,
  handleOnSave,
  handleOnDelete,
}: PersonDisplayProps) {
  function saveOnClick(id: string, newName: string, newPhone: string) {
    handleOnSave(id, newName, newPhone);
  }

  function deleteOnClick(id: string) {
    handleOnDelete(id);
  }

  return (
    <ul className="person__display">
      {personsToDisplay.map((person, _) => (
        <PersonDisplayItem
          key={person.id}
          person={person}
          saveOnClick={saveOnClick}
          deleteOnClick={deleteOnClick}
        />
      ))}
    </ul>
  );
}

type PersonDisplayItemProps = {
  person: PersonDetails;
  saveOnClick: (id: string, newName: string, newPhone: string) => void;
  deleteOnClick: (id: string) => void;
};

function PersonDisplayItem({
  person,
  saveOnClick,
  deleteOnClick,
}: PersonDisplayItemProps) {
  const [name, setName] = useState(person.name);
  const [phone, setPhone] = useState(person.phone);
  const [editing, setEditing] = useState(false);

  return (
    <li key={person.id}>
      {!editing ? (
        <>
          {name} --- {phone}
        </>
      ) : (
        <span>
          <input
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />{" "}
          ---{" "}
          <input
            value={phone}
            onChange={(e) => setPhone(e.currentTarget.value)}
          />
        </span>
      )}

      <button
        className="edit"
        onClick={() => {
          if (editing) {
            saveOnClick(person.id, name, phone);
          }
          setEditing(!editing);
        }}
      >
        {!editing ? "edit" : "save"}
      </button>

      <button className="delete" onClick={() => deleteOnClick(person.id)}>
        delete
      </button>
    </li>
  );
}
