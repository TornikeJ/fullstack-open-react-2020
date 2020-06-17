import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
    const padding = {
      paddingRight: 5
    }
    return (
      <div>
        <Link to='/' style={padding}>blogs</Link>
        <Link to='/users' style={padding}>users</Link>
      </div>
    )
  }

export default Navigation