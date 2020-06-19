import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client';


const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
   title: $title,
   author: $author,
   published: $published,
   genres: $genres
 ) {
   title,
   published,
   genres
 }
}
`

const ALL_BOOKS = gql`
query{
  allBooks{
      title
      author{
        name
        id
        born
        bookCount
       },
      published
  }
}
`

const ALL_AUTHORS = gql`
query{
  allAuthors {
   name
   born
   bookCount
 }
}
`

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [ createBook ] = useMutation(CREATE_BOOK, {
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_BOOKS })
      console.log(dataInStore.allBooks)
      console.log(response.data.addBook)
      store.writeQuery({
        query: ALL_BOOKS,
        data: {
          ...dataInStore,
          allBooks: [ ...dataInStore.allBooks, response.data.addBook ]
        }
      })
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    console.log(title,author,published,genres)
    console.log('add book...')
    createBook({  variables: { title, author, published, genres } }).catch(err=>console.log(err))


    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(+target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook