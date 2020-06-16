import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { connect } from 'react-redux'
import { riseVote } from "../reducers/anecdoteReducer";
import { voteNotification, resetNotification } from "../reducers/notificationReducer";



const AnecdoteList = (props) => {
    // const anecdotes = useSelector((state) => state.anecdotes);
    // const filter = useSelector(state => state.filter)
    // const dispatch = useDispatch();

    
    const handleVote = (anecdote) => {
        console.log("vote", anecdote.id);
        props.riseVote(anecdote);
        props.voteNotification(anecdote.content,5)
    };

    return (
        <div>
            {
                props.anecdotes
                    .filter(anecdote=>anecdote.content.toLowerCase().indexOf(props.filter.toLowerCase()) !== -1)
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

const mapStateToProps = (state) => {
    return {
      anecdotes: state.anecdotes,
      filter: state.filter,
    }
  }

const mapDispatchToProps = {
    riseVote,
    voteNotification
}

const ConnectedNotes = connect(mapStateToProps,mapDispatchToProps)(AnecdoteList)
export default ConnectedNotes
// export default AnecdoteList
