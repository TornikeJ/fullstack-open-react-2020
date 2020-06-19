import React from 'react'
import { gql, useQuery } from '@apollo/client';

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
      published,
      genres
  }
}
`
const ME= gql`
  query{
    me{
      favoriteGenre
    }
  }
`

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const resultMe = useQuery(ME)

  if (result.loading || resultMe.loading)  {
      return <div>loading...</div>
    }
    
    if (!props.show) {
        return null
    }
    
    const favoriteGenre= resultMe.data.me.favoriteGenre
    const books=result.data.allBooks.filter(book => book.genres.indexOf(favoriteGenre)!==-1)
    console.log(result.data, resultMe.data)

 
  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{favoriteGenre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map((a,i) =>
            <tr key={i}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}


export default Books