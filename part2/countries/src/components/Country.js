
import React from 'react'

const Country = (props) => {
    return(
        <div>
                <h1>{props.name}</h1>
                <p>capital {props.capital}</p>
                <p>population {props.population}</p>
                <h3>languages</h3>
                <ul>
                    {
                        props.languages
                        .map(language=><li key={language.name}>{language.name}</li>)
                    }
                </ul>
                <img alt="Flag" style={{width:80+'px'}} src={props.flag}/>
        </div>
    )
}

export default Country;
