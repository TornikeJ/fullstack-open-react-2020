import React, { useState, useEffect } from 'react'
import personsService from '../services/persons';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [ persons, setPersons ] = useState([]); 

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])




  const [ newName, setNewName ] = useState('');
  const [ newPhone, setNewPhone ] = useState('');
  const [ newFilter, setNewFilter ] = useState('');

  const addName = (event) =>{
      event.preventDefault();
      if(persons.map(person=>person.name).indexOf(newName) === -1){
          const personObject={name:newName,number:newPhone};

          personsService
          .create(personObject)
          .then(response => {
            setPersons(persons.concat(response.data))
            setNewName('');
            setNewPhone('');
          })
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
      <Filter value={newFilter} handleChange={updateFilter}/>
      <h2>Add a new</h2>
      <PersonForm 
        handleSubmit={addName} 
        nameValue={newName} 
        numberValue={newPhone}
        handleNameUpdate={updateName} 
        handlePhoneUpdate={updatePhone} 
    />
      <h2>Numbers</h2>
      <Persons filter={personsToShow}/>
    </div>
  )
}

export default App