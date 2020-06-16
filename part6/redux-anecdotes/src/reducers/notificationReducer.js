const initialState=''
let timeOut;

export const voteNotification = (anecdote,seconds) =>{
    return async dispatch => {
        
        clearTimeout(timeOut);

        dispatch({
            type:'VOTE',
            message:`you voted '${anecdote}'`
        })

        const time=seconds*1000;

        timeOut= setTimeout(()=>{
            dispatch(resetNotification())
        },time)
        
    }
}

export const addNotification = (anecdote,seconds) =>{
    return async dispatch =>{
        clearTimeout(timeOut)

        dispatch({
            type:'ADD',
            message:`you added '${anecdote}'`
        })

        const time=seconds*1000;
        
        timeOut= setTimeout(()=>{
            dispatch(resetNotification())
        },time)
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