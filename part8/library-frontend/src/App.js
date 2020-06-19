
import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import Recommendation from './components/Recommendation'
import NewBook from './components/NewBook'
import LoginForm from './components/Login'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token?
        <>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommend')}>recommend</button>
          <button onClick={logout}>log out</button>
        </>:
          <button onClick={()=> setPage('login')}>log in</button>
         }
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommendation
        show={page === 'recommend'}
      />
    {!token?
      <div>
        {/* <Notify errorMessage={errorMessage} /> */}
        <h2>Login</h2>
        <LoginForm show={page === 'login'}
          setToken={setToken}
          // setError={notify}
        />
      </div>
      :null
    }


      

    </div>
  )
}

export default App