import React, {useState} from 'react'
import { gql, useQuery, useMutation } from '@apollo/client';

const row={
  display:'flex'
}

const col1={
  width: '33%'
}
const col2={
  width: '67%'
}

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
      <div style={{display:'inline-block'}}>
      <h3>set birthyear</h3>
      <div style={row}>
        <span style={col1}>author</span>
        <select style={col2} value={name} onChange={(event)=>{setName(event.target.value)}}>
            <option></option>
            {authors.map((a,i) => <option key={i} value={a.name}>{a.name}</option> )}
        </select>
      </div>
      <div style={row}>
        <span style={col1}>born</span>
        <input style={col2} type="number" value={setBornTo} onChange={(event)=>{setYear(+event.target.value)}}/>
      </div>
      <button onClick={updateYear} type="button">update author</button>
      </div>
    </div>
  )
}

export default Authors
