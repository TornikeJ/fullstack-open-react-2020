
export const storeUserAction = (user) => {
    return {
        type:'ADD_USER',
        data: user
    }
}

const reducer = (state = null, action) =>{
    console.log("state now: ", state);
    console.log("action", action);

    switch(action.type){
        case 'ADD_USER':
            return action.data
        default:
            return state
    }
}

export default reducer