const initialState=''

export const filterAction = (filter) =>{
    return{
        type:'FILTER',
        filter
    }
}


const reducer = (state = initialState, action) =>{
    console.log('action', action)

    switch(action.type){
        case 'FILTER':
            return action.filter
        case 'RESET':
            return initialState
        default:
            return state
    }
}

export default reducer