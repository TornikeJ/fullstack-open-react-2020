
import React, { useState, useEffect } from 'react'
import {  gql, useSubscription, useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import Recommendation from './components/Recommendation'
import NewBook from './components/NewBook'
import LoginForm from './components/Login'

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title,
      author{
        name,
        born,
        bookCount
      }
      published,
      genres,
      id
    }
  } 
`

const ALL_BOOKS = gql`
query($genre:[String]){
  allBooks(genre:$genre){
      title,
      id,
      author{
        name
        born
        bookCount
       },
      published,
      genres
  }
}
`


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => {
      console.log(set)
      console.log(object) 
     return set.map(p => p.id).includes(object.id)  
    }

    let dataInStore = client.readQuery({ query: ALL_BOOKS })
    console.log(dataInStore)
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
      window.alert(`New Book ${addedBook.title} was added`)
    }   
    
    
    console.log(addedBook.genres)
    
    try {
      dataInStore = client.readQuery({ query: ALL_BOOKS, variables:{ genre:addedBook.genres} })
      console.log(dataInStore)
    } catch (error) {
      console.log(error)
    }
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        variables:{genre:addedBook.genres},
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData.data)
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
    }
  })

  
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
        updateCacheWith={updateCacheWith}
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