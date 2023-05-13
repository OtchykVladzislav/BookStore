import jwtDecode from "jwt-decode"

const defaultState = []

export const cartReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'ADD_CART':
            return [...state, action.payload]
        case 'NULL_CART':
            return []
        default:
            return state
    }
}
