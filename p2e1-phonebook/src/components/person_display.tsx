import type { PersonDetails } from "../utils/types";

type PersonDisplayProps = {
  persons: PersonDetails[];
  personsFiltered: PersonDetails[];
};

export default function PersonDisplay({
  persons,
  personsFiltered,
}: PersonDisplayProps) {
  const currentPersonList = !personsFiltered ? persons : personsFiltered;

  function handleOnDelete() {}

  return (
    <ul className="person__display">
      {currentPersonList.map((person, _) => (
        <>
          <li key={person.id}>
            {person.name} --- {person.phone}
          </li>
          <button className="edit">edit</button>
          <button className="delete" onClick={handleOnDelete}>
            delete
          </button>
        </>
      ))}
    </ul>
  );
}
