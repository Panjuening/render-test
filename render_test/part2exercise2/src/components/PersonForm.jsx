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

export default PersonForm

