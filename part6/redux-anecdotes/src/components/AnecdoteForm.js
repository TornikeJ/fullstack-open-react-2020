import React, {useState} from 'react'
import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { addNotification, resetNotification } from "../reducers/notificationReducer";
import anecdoteService from '../services/anecdotes';
import anecdotes from '../services/anecdotes';


const AnecdoteForm = () => {
    const dispatch = useDispatch();
    const [anecdote, setAnecdote] = useState('');

    const handleChange = (event) => {
      setAnecdote(event.target.value)
    }
  
    const add = async (event) => {
      event.preventDefault()
      const newAnecdote= await anecdoteService.addAnecdote(anecdote)
      dispatch(addAnecdote(newAnecdote))
      dispatch(addNotification(anecdote))
      setAnecdote('')
      setTimeout(()=>{
        dispatch(resetNotification())
      },5000)
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

export default AnecdoteForm