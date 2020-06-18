import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
    const padding = {
      paddingRight: 5
    }
    return (
      <div className="mr-auto" >
        <Link to='/' style={padding}>Blogs</Link>
        <Link to='/users' style={padding}>Users</Link>
      </div>
    )
  }

export default Navigation