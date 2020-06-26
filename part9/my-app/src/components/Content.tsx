import React from 'react'
import { CoursePart } from '../shared/courseParts';
import Parts from './Part'

const Content: React.FC<{courseParts : CoursePart[]}> = ({courseParts}) => {
        return (<>{ courseParts.map((coursePart,index)=>{
                return <Parts key={index} coursePart={coursePart}></Parts>
            })
        }</>)
    }

export default Content;