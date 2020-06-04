
import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Country = (props) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weather, SetWeather] = useState();

    useEffect(() => {
        console.log('effect')
        axios
          .get(`https://api.weatherstack.com/current?access_key=${api_key}&query=${props.capital}`)
          .then(response => {
            console.log(response.data)
            /*idea is clear, 
            but I'm getting 
            {code: 105, type: "https_access_restricted", 
            info: "Access Restricted - Your current Subscription Plan does not support HTTPS Encryption."}
            skipping this exercise
            */
          })
      }, [])

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
