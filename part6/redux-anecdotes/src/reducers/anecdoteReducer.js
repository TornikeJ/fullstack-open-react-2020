export const initAnecdotes = (anecdotes) => {
  return {
    type:'INIT',
    data:anecdotes
  }
}

export const addAnecdote = (anecdote) => {
  return {
    type:'ADD_ANECDOTE',
    data:anecdote
  }
}

export const riseVote = (id) =>{
  return {
    type:'RISE_VOTE',
    data: {
      id
    }
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){
    case 'RISE_VOTE':
      const anecdoteToUpdate=state.find(anecdote => action.data.id === anecdote.id)
      anecdoteToUpdate.votes +=1
      return state.map(anecdote => anecdote.id === action.data.id? anecdoteToUpdate: anecdote)
    case 'ADD_ANECDOTE':
      return state.concat(action.data)
    case 'INIT':
      return action.data
    default:
      return state
  }

}

export default reducer
