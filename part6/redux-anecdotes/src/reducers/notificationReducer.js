const initialState=''

export const voteNotification = (anecdote) =>{
    return{
        type:'VOTE',
        message:`you voted '${anecdote}'`
    }
}

export const addNotification = (anecdote) =>{
    return{
        type:'ADD',
        message:`you added '${anecdote}'`
    }
}

export const resetNotification = () =>{
    return{
        type:'RESET',
        message: ''
    }
}


const reducer = (state = initialState, action) =>{
    console.log('action', action)

    switch(action.type){
        case 'ADD':
            return action.message
        case 'VOTE':
            return action.message
        case 'RESET':
            return action.message
        default:
            return state
    }
}

export default reducer