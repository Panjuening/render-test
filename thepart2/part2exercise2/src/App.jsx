import { useState,useEffect } from 'react'
import axios from 'axios'

const Filter=({searchQuery,setSearchQuery})=>
{
return(
<div>
   <input 
          value={searchQuery} 
          onChange={(e)=>setSearchQuery(e.target.value)} 
          placeholder="输入姓名搜索"
        />
    </div>
)
}

const PersonForm=({addPerson,newName,newNumber,setNewName,setNewNumber})=>
{
return(
  <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(e)=>setNewName(e.target.value)}/>
          number: <input value={newNumber} onChange={(e)=>setNewNumber(e.target.value)}/>
          <button type="submit">add</button>
        </div>
</form> 
)
}


 const Persons = ({ filteredPersons }) => {
  return (
    <ul>
      {filteredPersons.map(person => (
        <li key={person.name}>{person.name} {person.number}</li>
      ))}
    </ul>
  );
};



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber]=useState('')
const [searchQuery, setSearchQuery] = useState('')

useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons message')

const addPerson=(event)=>
{
event.preventDefault()
  const nameExists = persons.some(person => person.name === newName); 
     if (nameExists) {
      alert(`${newName} 已存在于电话簿中`);
      return;
      }

  const PersonObject = {
    name: newName,
    number:newNumber,
  }

  setPersons(persons.concat(PersonObject))
  setNewName('')
  setNewNumber('')
}

const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  

  return (
    <div>
      
      <h2>Phonebook</h2>
      <Filter searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      


      <h2>add a new</h2>
      <PersonForm  addPerson={addPerson} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber}/>

      

       <h3>Numbers</h3>
       <Persons filteredPersons={ filteredPersons }/>
      
        

    </div>
  )
}

export default App
