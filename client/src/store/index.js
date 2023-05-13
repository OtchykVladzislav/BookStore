import { combineReducers, createStore } from "redux"
import { cartReducer } from "./cartReducer"
import { tokenReducer } from "./hashToken"

const rootReducer = combineReducers({
    token: tokenReducer,
    cart: cartReducer
})

const store = createStore(rootReducer)

export default store