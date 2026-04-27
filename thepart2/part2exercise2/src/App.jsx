import { useState,useEffect } from 'react'
import personService from './services/person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import ReNotification from './components/ReNotification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber]=useState('')
const [searchQuery, setSearchQuery] = useState('')
const [suessceMessage, setSuessceMessage] = useState([])
const [errorMessage, setErrorMessage] = useState([])

useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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
        const person = persons.find(n => n.id === PersonObject.id)
        const changedPerson = { ...person, number: newNumber }
         personService
      .update(PersonObject.id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id === PersonObject.id  ? returnedPerson : person))
         setNewName('')
         setNewNumber('')
         setSuessceMessage(
          `已变更 ${newName}`
        )
        setTimeout(() => {
          setSuessceMessage(null)
        }, 5000)
  }).catch(
        setErrorMessage(
          `变更失败,该${newName}的记录已被别人删除`
        ),
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
  )
   

       }
       else{ 
      alter("已取消替换")} 
      }

  
else{personService
      .create(PersonObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
        setSuessceMessage(
          `Added ${newName}`
        )
        setTimeout(() => {
          setSuessceMessage(null)
        }, 5000)
        
    }
}

const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  

const toggleTrashOf = (id) => {
     if(window.confirm("Delect "+`${id}`))
     {
       personService
       .deletepoint(id)
      .then(initialPersons => {
        console.log('Resource deleted successfully:',initialPersons.data)
         personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
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
      

      <Notification message={suessceMessage} />
      <ReNotification message={errorMessage}/>
      <h2>add a new</h2>
      <PersonForm  addPerson={addPerson} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber}/>

      

       <h3>Numbers</h3>
       <Persons filteredPersons={ filteredPersons }  toggleTrash={toggleTrashOf}/>
      
        

    </div>
  )
}

export default App