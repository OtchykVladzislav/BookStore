import { createStore } from "redux"

const defaultState = {
    token: localStorage.getItem('user')
}

const reducer = (state = defaultState, action) => {
    switch(action.type){
        case 'ADD_TOKEN':
            return {...state, token: action.payload}
        case 'DELETE_TOKEN':
            return {...state, token: ''}
        default:
            return state
    }
}

const store = createStore(reducer)

export default store