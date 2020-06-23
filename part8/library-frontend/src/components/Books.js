import React, {useState, useEffect} from 'react'
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

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [getFiltered,filteredResult] = useLazyQuery(ALL_BOOKS)
  const [books, setBooks] = useState(null)
  
  useEffect(()=>{
    if(result.data){
      setBooks(result.data.allBooks)
    }
  },[result.data])

  useEffect(()=>{
    if(filteredResult.data){
      setBooks(filteredResult.data.allBooks)
    }
  },[filteredResult.data])
  
  if (result.loading)  {
    return <div>loading...</div>
  }
  
  if (!props.show) {
    return null
  }

  const allBooks=result.data.allBooks
  const filters = []


  allBooks
    .forEach((a,i) => a.genres.forEach((genre,index,array)=> {
      filters.push(genre)
    }))
  
  const filterGenre = (event) => {
    const genre=event.target.value
    if(genre === 'all'){
      setBooks(result.data.allBooks)
    } else{
      getFiltered({variables: {genre}})
      // setBooks(result.data.allBooks.filter(book => book.genres.indexOf(genre)!==-1))
    }
  }


  return (
    <div>
      <h2>books</h2>
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
      <>
      {filters
      .map((genre,index)=> {
        if(filters.indexOf(genre)===index){
          return <button type="button" onClick={filterGenre} key={index} value={genre}>{genre}</button>
        }
      })}
      <button onClick={filterGenre} value={'all'}>all genres</button>
      </>
    </div>
  )
}

export default Books