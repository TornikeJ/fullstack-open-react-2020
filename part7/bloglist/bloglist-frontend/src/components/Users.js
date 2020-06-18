import React from 'react'
import {
  Link
} from "react-router-dom"

const Users = ({users}) => {

  return (
    <>
    <h2>Users</h2>
    <table className="table">
      <thead>
        <tr>
          <td></td>
          <td>blogs created</td>
        </tr>
      </thead>
      <tbody>
        {
        users
        .map((user,i) => <tr key={i}><td><Link to={`/users/${user.id}`}>{user.username}</Link></td><td>{user.blogs.length}</td></tr>)
        }
      </tbody>
    </table>
    </>
  )
}

export default Users