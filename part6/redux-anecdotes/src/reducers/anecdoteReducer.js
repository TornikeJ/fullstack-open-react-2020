import anecdoteService from '../services/anecdotes'

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT",
      data: anecdotes,
    })
  }
}

export const addAnecdote = (anecdote) => {
  return async (dispatch) =>{
    const newAnecdote= await anecdoteService.addAnecdote(anecdote)
    dispatch(
      {
        type: "ADD_ANECDOTE",
        data: newAnecdote,
      }
    )
  };
};

export const riseVote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote= await anecdoteService.updateAnecdote(anecdote)
    dispatch({
      type: "RISE_VOTE",
      data: {
        updatedAnecdote
      }
    })
  };
};

const reducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "RISE_VOTE":
      const updatedAnecdote=action.data.updatedAnecdote
      return state.map((anecdote) =>
        updatedAnecdote.id === anecdote.id ? updatedAnecdote : anecdote
      );
    case "ADD_ANECDOTE":
      return state.concat(action.data);
    case "INIT":
      return action.data;
    default:
      return state;
  }
};

export default reducer;
