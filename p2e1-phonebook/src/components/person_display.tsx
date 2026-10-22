import type { PersonDetails } from "../utils/types";

type PersonDisplayProps = {
  personsToDisplay: PersonDetails[];
  handleOnDelete: (id: string) => void;
};

export default function PersonDisplay({
  personsToDisplay,
  handleOnDelete,
}: PersonDisplayProps) {
  function deleteOnClick(id: string) {
    handleOnDelete(id);
  }

  return (
    <ul className="person__display">
      {personsToDisplay.map((person, _) => (
        <li key={person.id}>
          {person.name} --- {person.phone}
          <button className="edit">edit</button>
          <button className="delete" onClick={() => deleteOnClick(person.id)}>
            delete
          </button>
        </li>
      ))}
    </ul>
  );
}
