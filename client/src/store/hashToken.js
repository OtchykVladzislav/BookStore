import { createStore } from "redux"

const defaultState = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWQiOiIxIiwiZmlyc3ROYW1lIjoiSm9obiIsImxhc3ROYW1lIjoiRG9lIiwibnVtYmVyIjoiKzM3NTQ0NTc2NTA2NSIsImVtYWlsIjoidmxhZG90Y2hpay0yNjVAbWFpbC5ydSIsInVzZXJuYW1lIjoiQmlnRGpvIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE1MTYyMzkwMjJ9.oNeMWi04G0afOufBeSLfGGhrHHblax2er42bcaHtETQ'
}

const reducer = (state = defaultState, action) => {
    switch(action.type){
        case 'ADD_TOKEN':
            return {...state, token: state.payload}
        case 'DELETE_TOKEN':
            return {...state, token: ''}
        default:
            return state
    }
}

const store = createStore(reducer)

export default store