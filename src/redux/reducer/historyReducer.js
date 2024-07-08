import * as actionTypes from '../actionTypes'

const initialState = {
    walletHistory: null,
    chatHistory: null
}

const history = (state = initialState, actions) => {
    const { type, payload } = actions;
    switch (type) {
        case actionTypes.SET_WALLET_HISTORY:
            return {
                ...state,
                walletHistory: payload
            }
        case actionTypes.SET_CHAT_HISTORY:
            return {
                ...state,
                chatHistory: payload
            }
        default:
            return state;
    }
}

export default history;