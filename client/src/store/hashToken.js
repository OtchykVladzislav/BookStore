const defaultState = {
    token: localStorage.getItem('user')
}

export const tokenReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'ADD_TOKEN':
            return {...state, token: action.payload}
        case 'DELETE_TOKEN':
            return {...state, token: ''}
        default:
            return state
    }
}