import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [max, setMax] = useState(selected)
  const [vote, setVote] = useState({
    0:0,1:0,2:0,3:0,4:0,5:0
  })

  const pickAnecdote = () =>{
    setSelected(Math.floor(Math.random() * props.anecdotes.length)); 
  }

  const updateVote = () => {
    const copy={...vote};
    copy[selected] +=1;
    updateMax(copy);
    setVote(copy);
  }

  const updateMax = (votes) => {
    const sorted=Object.keys(votes).sort((a,b)=> votes[b] - votes[a]);
    setMax(sorted[0]);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {props.anecdotes[selected]}  
      </p>
      <p>
        has {vote[selected]} votes  
      </p>
      <button onClick={updateVote}>vote</button>
      <button onClick={pickAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>
        {props.anecdotes[max]}  
      </p>
      <p>
        has {vote[max]} votes  
      </p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)