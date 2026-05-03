const Persons = ({ filteredPersons,toggleTrash }) => {
  return (
    <ul>
      {filteredPersons.map(person => (
        <li key={person.name}>{person.name} {person.number}
        <button onClick={() =>toggleTrash(person.id)}>Go to Trash</button></li>
      ))}
    </ul>
  );
};

export default Persons
