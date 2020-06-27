import React from 'react';
import { Entry, HealthCheckRating } from '../types/Entry';
import {  Card, Icon } from 'semantic-ui-react';

const EntryDetails: React.FC<{entry:Entry}> = ({entry}) =>{
    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };

    const checkHealth = (health:HealthCheckRating) =>{
      switch(health){
        case 0:
          return <Icon color="green" name="heart"/>
        case 1:
          return <Icon color="yellow" name="heart"/>
        case 2:
          return <Icon color="orange" name="heart"/>
        case 3:
          return <Icon color="red" name="heart"/>
        default:
            return <Icon color="brown" name="heart"/>
      }
    }

    const checkType = (entry:Entry) =>{
      switch(entry.type){
        case "HealthCheck":
          return <Icon  name="user md"/>
        case "Hospital":
          return <Icon  name="hospital outline"/>
        case "OccupationalHealthcare":
          return <Icon  name="stethoscope"/>
        default:
            return <Icon  name="question"/>
      }
    }

    switch(entry.type){
        case "HealthCheck":
            return(
                <div>
                  <Card fluid style={{padding: '1rem', marginBottom:'1rem'}}>
                    <Card.Header><h3>{entry.date} {checkType(entry)}</h3></Card.Header>
                    <Card.Description>{entry.description}</Card.Description>
                    <Card.Description>{checkHealth(entry.healthCheckRating)}</Card.Description>
                  </Card>
                </div>
          ) 
        case "Hospital":
            return(
                <div>
                  <Card fluid style={{padding: '1rem', marginBottom:'1rem'}}>
                    <Card.Header><h3>{entry.date} {checkType(entry)} </h3></Card.Header>
                    <Card.Description>{entry.description}</Card.Description>
                  </Card>
                </div>
          ) 
        case "OccupationalHealthcare":
            return(
                <div>
                  <Card fluid style={{padding: '1rem', marginBottom:'1rem'}}>
                    <Card.Header><h3>{entry.date} {checkType(entry)} {entry.employerName}</h3></Card.Header>
                    <Card.Description>{entry.description}</Card.Description>
                  </Card>
                </div>
          )
        default:
          return assertNever(entry) 
    }
}

export default EntryDetails