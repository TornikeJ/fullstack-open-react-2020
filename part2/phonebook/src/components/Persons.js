
import React from 'react'

const Persons = (props) => {
    return(
        <div>
            {props.filter.map(person=> <p key={person.name}>{person.name} {person.number}</p>)}
        </div>
    )
}

export default Persons;
