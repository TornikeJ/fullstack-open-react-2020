import React from 'react'
import Country from './Country'
import { useState } from 'react'

const Countries = (props) => {

    const[showView, setShowView]=useState({});
    
    const updateShowView = (name) =>{
        setShowView({...showView, [name]: !(!!showView[name])});
    }

    return(
        <div>
            {
                props.filter.length === 0? '' :
                props.filter.length === 1? 
                <Country 
                        name={props.filter[0].name}
                        capital={props.filter[0].capital}
                        population={props.filter[0].population}
                        languages={props.filter[0].languages}
                        flag={props.filter[0].flag}
                /> 
                :
                props.filter.length > 10? 
                'Too many matches, specify another filter' :
                props.filter
                .map(country=> {
                   return (
                    <div key={country.name}>
                        <span>{country.name} {country.number}</span>
                        <button onClick={()=>updateShowView(country.name)}>show</button>
                        {
                            showView[country.name]?
                                <Country
                                    name={country.name}
                                    capital={country.capital}
                                    population={country.population}
                                    languages={country.languages}
                                    flag={country.flag}
                                />
                                : 
                                null                         
                        }
                    </div>
                    )
                })
            }
        </div>
    )
}

export default Countries;
