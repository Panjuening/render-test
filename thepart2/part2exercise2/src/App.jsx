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
const PersonObject = {
    name: newName,
    number:newNumber,
    id:newName+'i',
  }
  const nameExists = persons.some(person => person.name === newName); 
     if (nameExists) {
       if(window.confirm(`${newName} 已存在于电话簿中,是否需要替换?`))
       {
        const url = `http://localhost:3001/persons/${PersonObject.id}`
        const person = persons.find(n => n.id === PersonObject.id)
        const changedNote = { ...person, number: newNumber }
        axios.put(url, changedNote).then(response => {
    setPersons(persons.map(person => person.id === PersonObject.id ? response.data : person))
         setNewName('')
    setNewNumber('') 
  })

       }
       else{alter('未替换')}


      }

  
 axios
    .post('http://localhost:3001/persons', PersonObject)
    .then(response => {
      setPersons(persons.concat(response.data))
      console.log(response.data)
      setNewName('')
    setNewNumber('')})
}

const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  

const toggleTrashOf = (id) => {
  const url = `http://localhost:3001/persons/${id}`
     if(window.confirm("Delect "+`${id}`))
     {
        axios.delete(url)
  .then(response => {
    console.log('Resource deleted successfully:',response.data)
  })
  .catch(error => {
    console.error('Error deleting resource:', error)
  })
     }else{alert("Delete have been cancled")}



  }
  

  return (
    <div>
      
      <h2>Phonebook</h2>
      <Filter searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      


      <h2>add a new</h2>
      <PersonForm  addPerson={addPerson} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber}/>

      

       <h3>Numbers</h3>
       <Persons filteredPersons={ filteredPersons }  toggleTrash={toggleTrashOf}/>
      
        

    </div>
  )
}

export default App