import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' ,number:'100000'}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber]=useState('')
  const [searchQuery, setSearchQuery] = useState('');


  const Filter=({})=>
  {
    <div>
   <input 
          value={searchQuery} 
          onChange={(e)=>setSearchQuery(e.target.value)} 
          placeholder="输入姓名搜索"
        />
    </div> 
  }

  const PersonForm=({})=>
  { 
    const addPerson = (event) => {
      event.preventDefault()
    const nameExists = persons.some(person => person.name === newName); 
     if (nameExists) {
      alert(`${newName} 已存在于电话簿中`);
      return;
      }

      const personObject = {
      name: newName,
      number:newNumber,
    }
  setPersons(persons.concat(personObject))
  setNewName('');
  setNewNumber('');
  }

  <div>
      <form onSubmit={addPerson}>
         name:<input value={newName}  onChange={(e)=>setNewName(e.target.value)}/>
         number:<input value={newNumber} onChange={(e)=>setNewNumber(e.target.value)}/>
          <button type="submit">add</button>
      </form>
  </div>
  }

  const Persons=({})=>
  {
const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const Person = ({ person }) => {  
  return (
    <li>{person.name} {person.number}</li>
  )
  }

      <ul>
        {filteredPersons.map(person => (
          <Person key={person.name} person={person} />
        ))}
      </ul>

  }


  return (
    <div>

      <h2>Phonebook</h2>
      search<Filter />
       
      <h2>add a new</h2>
     <PersonForm />

      <h2>Numbers</h2>
      <Persons/>

      </div>
  )
}

export default App