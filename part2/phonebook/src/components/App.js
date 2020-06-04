import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]); 
  const [ newName, setNewName ] = useState('');
  const [ newPhone, setNewPhone ] = useState('');
  const [ newFilter, setNewFilter ] = useState('');

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
  
  const updateFilter = (event) =>{
    setNewFilter(event.target.value);
  }

  const personsToShow=newFilter? 
  persons.filter(person=>person.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1) 
  : persons;


  return (
    <div>
      <h2>Phonebook</h2>
        <div>
            filter shown with: <input value={newFilter} onChange={updateFilter} />
        </div>
      <h2>Add a new</h2>
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
      {personsToShow.map(person=> <p key={person.name}>{person.name} {person.phone}</p>)}
    </div>
  )
}

export default App