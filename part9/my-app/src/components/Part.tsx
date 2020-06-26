import React from 'react'
import { CoursePart } from '../shared/courseParts';

const Parts : React.FC<{coursePart:CoursePart}> = ({coursePart}) =>{
    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };

    switch(coursePart.name){
        case "Fundamentals":
            return (
                <div>
                    <p>
                    <strong>{coursePart.name}</strong>
                    </p>
                    {coursePart.description && (
                    <p>
                        <em>{coursePart.description}</em>
                    </p>
                    )}
                    <p>
                    Exercises: <strong>{coursePart.exerciseCount}</strong>
                    </p>
                    <hr />
                </div>
                );
        case "Using props to pass data":
            return (
                <div>
                    <p>
                    <strong>{coursePart.name}</strong>
                    </p>
                    <p>
                    Exercises: <strong>{coursePart.exerciseCount}</strong>
                    </p>
                    <p>
                    Group Projects: <strong>{coursePart.groupProjectCount}</strong>
                    </p>
                    <hr />
                </div>
                );
        case "Deeper type usage":
            return (
                <div>
                    <p>
                    <strong>{coursePart.name}</strong>
                    </p>
                    {coursePart.description && (
                    <p>
                        <em>{coursePart.description}</em>
                    </p>
                    )}
                    <p>
                    Exercises: <strong>{coursePart.exerciseCount}</strong>
                    </p>
                    <p>
                    Submission Link:{" "}
                    <a href={coursePart.exerciseSubmissionLink}>
                        {coursePart.exerciseSubmissionLink}
                    </a>
                    </p>
                    <hr />
                </div>
                );
        case "Super Duper":
            return (
                <div>
                    <p>
                    <strong>{coursePart.name}</strong>
                    </p>
                    {coursePart.description && (
                    <p>
                        <em>{coursePart.description}</em>
                    </p>
                    )}
                    <p>
                    Exercises: <strong>{coursePart.exerciseCount}</strong>
                    </p>
                    <p>
                    Group Projects: <strong>{coursePart.groupProjectCount}</strong>
                    </p>
                    <hr />
                </div>
                );
        default:
            return assertNever(coursePart);
    }
}

export default Parts;