import React from 'react'
import Country from './Country'

const Countries = (props) => {
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
                .map(country=> <p key={country.name}>{country.name} {country.number}</p>)
            }
        </div>
    )
}

export default Countries;
