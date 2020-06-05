import React, { useState, useEffect } from 'react'
import personsService from '../services/persons';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Notification from './Notification';

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
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const addName = (event) =>{
      event.preventDefault();
      if(persons.map(person=>person.name).indexOf(newName) === -1){
          const personObject={name:newName,number:newPhone};

          personsService
          .create(personObject)
          .then(() => {
            setPersons(persons.concat(personObject));
            setSuccessMessage(
              `Number was added`
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 7000);

            setNewName('');
            setNewPhone('');
          })
          .catch(error => {
            const errorMessage=error.response.data
            setErrorMessage(errorMessage.error)

            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      } else{
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one ?`)) { 
          const person = persons.find(person => person.name === newName);
          const newPerson={...person,number:newPhone};
          personsService
            .update(person.id,newPerson)
            .then(() => {
              setPersons(persons.map(personDb => personDb.id !== person.id? personDb: newPerson));
              setSuccessMessage(
                `Number was updated`
              )
              setTimeout(() => {
                setSuccessMessage(null)
              }, 5000);

              setNewName('');
              setNewPhone('');
            })
            .catch(error => {
              setErrorMessage(
                `Person ${person.name} was already removed from server`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)

              setPersons(persons.filter(n => n.id !== person.id))  
            })    
          }
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

  const deleteNumber = (person) =>{
 
    if (window.confirm(`Delete ${person.name} ?`)) { 
        personsService
            .deleteUser(person.id)
            .then(() => {
                setPersons(persons.filter(data=> data.id !== person.id))
            })
    }
}


  const personsToShow=newFilter? 
  persons.filter(person=>person.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1) 
  : persons;


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification errorMessage={errorMessage} successMessage={successMessage} />
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
      <Persons filter={personsToShow} handleDelete={deleteNumber}/>
    </div>
  )
}

export default App