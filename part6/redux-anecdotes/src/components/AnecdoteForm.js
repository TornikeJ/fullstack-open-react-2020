import React from 'react'

const AnecdoteForm = ({add, handleChange, anecdote}) =>{
    return(
        <form onSubmit={add}>
            <div>
                <input 
                onChange={handleChange} 
                value={anecdote}
                required 
                />
            </div>
            <button type="submit">create</button>
        </form>
    )
}

export default AnecdoteForm