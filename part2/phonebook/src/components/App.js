import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([]); 
  const [ newName, setNewName ] = useState('');
  const [ newPhone, setNewPhone ] = useState('');

  const addName = (event) =>{
      event.preventDefault();
      if(persons.map(person=>person.name).indexOf(newName) === -1){
          setPersons([...persons,{name:newName,phone:newPhone}]);
          setNewName('');
          setNewPhone('');
      } else{
          alert(`${newName} is already added to phonebook`);
      }
  }

  const updateName = (event) =>{
    setNewName(event.target.value)
  }

  const updatePhone = (event) =>{
    setNewPhone(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
            name: <input value={newName} onChange={updateName} />
        </div>
        <div>
            number: <input value={newPhone} onChange={updatePhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person=> <p key={person.name}>{person.name} {person.phone}</p>)}
    </div>
  )
}

export default App