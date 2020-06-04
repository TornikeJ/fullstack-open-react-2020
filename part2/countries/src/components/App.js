import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter';
import Countries from './Countries';

const App = () => {
  const [ countries, setCountries ] = useState([]); 

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response)
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const [ newFilter, setNewFilter ] = useState('');

  const updateFilter = (event) =>{
    setNewFilter(event.target.value);
  }

  const updateCountries = () =>{
    if(newFilter === ''){
      return [];
    }
    const countriesToShow=countries
    .filter(country=>country.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1) 

    return countriesToShow;
  }



  return (
    <div>
      <Filter value={newFilter} handleChange={updateFilter}/>
      <Countries filter={updateCountries()}/>
    </div>
  )
}

export default App