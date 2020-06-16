import React, {useState} from 'react'
import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { addNotification, resetNotification } from "../reducers/notificationReducer";
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes';
import anecdotes from '../services/anecdotes';


const AnecdoteForm = (props) => {
    // const dispatch = useDispatch();
    const [anecdote, setAnecdote] = useState('');

    const handleChange = (event) => {
      setAnecdote(event.target.value)
    }
  
    const add = async (event) => {
      event.preventDefault()
      props.addAnecdote(anecdote)
      props.addNotification(anecdote,5)
      setAnecdote('')
    }

    return(
        <form onSubmit={add} style={{'marginBottom':'3rem'}}>
            <h2>create new</h2>
            <div>
                <input 
                    onChange={handleChange} 
                    value={anecdote}
                />
            </div>
            <button type="submit">create</button>
        </form>
    )
}


const mapDispatchToProps = {
    addAnecdote,
    addNotification
}

const ConnectedNotes = connect(null,mapDispatchToProps)(AnecdoteForm)
export default ConnectedNotes

// export default AnecdoteForm