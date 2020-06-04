
import React from 'react'

const Persons = (props) => {

     return(
        <div>
            {props.filter.map(person=>{
                return(
                    <div key={person.name}>
                        <span>{person.name} {person.number}</span>
                        <button onClick={()=>props.handleDelete(person)}>delete</button>
                    </div>
                )}) 
            }
        </div>
    )
}

export default Persons;
