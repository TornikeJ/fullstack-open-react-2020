import React, {useState} from 'react'
import { gql, useQuery, useMutation } from '@apollo/client';

const ALL_AUTHORS = gql`
query{
  allAuthors {
   name
   born
   bookCount
 }
}
`

const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $setBornTo: Int!) {
     editAuthor(name: $name, setBornTo: $setBornTo) {
       name
       born
     }
  }
`

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [setBornTo, setYear] = useState('')
  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS} ]
  })

  if (result.loading)  {
    return <div>loading...</div>
  }


  if (!props.show) {
    return null
  }
  const authors = result.data.allAuthors;

  const updateYear = async () =>{
    
    updateAuthor({  variables: { name, setBornTo } }).catch(err=>console.log(err))

    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>set birthyear</h3>
      <div>
        name
        <input value={name} onChange={(event)=>{setName(event.target.value)}}/>
      </div>
      <div>
        born
        <input type="number" value={setBornTo} onChange={(event)=>{setYear(+event.target.value)}}/>
      </div>
      <button onClick={updateYear} type="button">update author</button>
    </div>
  )
}

export default Authors
