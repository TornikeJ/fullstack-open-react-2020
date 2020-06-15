import React, {useState} from "react";
import { addAnecdote, riseVote } from "./reducers/anecdoteReducer";
import { useSelector, useDispatch } from "react-redux";
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();
  const [anecdote, setAnecdote] = useState('');


  const handleChange = (event) => {
    setAnecdote(event.target.value)
  }

  const vote = (id) => {
    console.log("vote", id);
    dispatch(riseVote(id));
  };

  const add = (event) => {
    event.preventDefault()
    dispatch(addAnecdote(anecdote))
    setAnecdote('')
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a,b)=> b.votes - a.votes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <AnecdoteForm 
        handleChange={handleChange} 
        anecdote={anecdote} 
        add={add}
      />
    </div>
  );
};

export default App;
