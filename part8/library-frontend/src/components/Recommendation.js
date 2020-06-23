import React, {useEffect,useState} from 'react'
import { gql, useQuery, useLazyQuery } from '@apollo/client';

const ALL_BOOKS = gql`
query($genre:[String]){
  allBooks(genre:$genre){
      title
      author{
        name
        id
        born
        bookCount
       },
      published,
      genres,
      id
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
  const resultMe = useQuery(ME)
  const [books, setBooks]=useState([]);
  const [favoriteGenre,setFavoriteGenre]=useState('')
  const result = useQuery(ALL_BOOKS,{variables:{genre:favoriteGenre}})
  
  useEffect(()=>{
    if(result.data){
      console.log('rec',result.data)
      setBooks(result.data.allBooks)
    }
  },[result.data])

  useEffect(()=>{
    if(resultMe.data){
      console.log('fav',resultMe.data.me.favoriteGenre)
      setFavoriteGenre(resultMe.data.me.favoriteGenre)
    }
  },[resultMe.data])

  if (result.loading || resultMe.loading)  {
    return <div>loading...</div>
  }
  
  if (!props.show) {
    return null
  }

  // const books=result.data.allBooks.filter(book => book.genres.indexOf(favoriteGenre)!==-1)

 
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