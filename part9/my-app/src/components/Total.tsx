import React from 'react';
import {CourseParts} from '../shared/courseParts'

const Total:React.FC<CourseParts> = ({courseParts}) =>{
    return(
    <p>
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>)
}

export default Total;