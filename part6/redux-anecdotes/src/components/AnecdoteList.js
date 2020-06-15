import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { riseVote } from "../reducers/anecdoteReducer";
import { voteNotification, resetNotification } from "../reducers/notificationReducer";



const AnecdoteList = () => {
    const anecdotes = useSelector((state) => state.anecdotes);
    const filter = useSelector(state => state.filter)

    const dispatch = useDispatch();

    
  const handleVote = (anecdote) => {
    console.log("vote", anecdote.id);
    dispatch(riseVote(anecdote.id));
    dispatch(voteNotification(anecdote.content))
    setTimeout(()=>{
    dispatch(resetNotification())
    },5000)
  };

    return (
        <div>
            {
                anecdotes
                    .filter(anecdote=>anecdote.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
                    .sort((a,b)=> b.votes - a.votes)
                    .map((anecdote) => (
                        <div key={anecdote.id}>
                        <div>{anecdote.content}</div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={()=>{handleVote(anecdote)}}>vote</button>
                        </div>
                        </div>
                    ))
            }
        </div>
    )
};  

export default AnecdoteList
