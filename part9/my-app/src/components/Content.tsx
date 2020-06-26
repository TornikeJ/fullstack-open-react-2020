import React from 'react'
import { CourseParts } from '../shared/courseParts';

const Content: React.FC<CourseParts> = (props) => {
        return (
        <>
        {
            props.courseParts.map(course=>{
                return <p>{course.name} {course.exerciseCount}</p>
            })
        }
        </>
        )
    }

export default Content;