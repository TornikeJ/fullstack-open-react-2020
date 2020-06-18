import React from 'react'
import { useParams } from 'react-router-dom'

const User = ({users}) => {
    const id = useParams().id
    console.log(id)
    const user = users.find(x=>x.id===id) 
    console.log(users.find(x=>x.id===id))
    // const user = users.find(user => user.id === id)
    return (
        <>
        <h1>{user?.username}</h1>
        <h5>Added Blogs</h5>
        <ul className="list-group">
            {user?.blogs.map((blog,i) =><li className="list-group-item" key={i}>{blog.title}</li>
            )}
        </ul>
        </>
    )
}

export default User