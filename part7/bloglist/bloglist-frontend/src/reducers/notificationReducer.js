const initialState=''
let timeOut;

export const addSuccessNotification = (message,seconds=5) =>{
    return async dispatch =>{
        clearTimeout(timeOut)

        dispatch({
            type:'SUCCESS',
            message
        })

        const time=seconds*1000;
        
        timeOut= setTimeout(()=>{
            dispatch(resetNotification())
        },time)
    }
}

export const addFailNotification = (message,seconds=5) =>{
    return async dispatch =>{
        clearTimeout(timeOut)

        dispatch({
            type:'FAIL',
            message
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
        case 'SUCCESS':
            return {
                message:action.message,
                result:'success'
            }
        case 'FAIL':
            return {
                message:action.message,
                result:'error'
            }
        case 'RESET':
            return action.message
        default:
            return state
    }
}

export default reducer