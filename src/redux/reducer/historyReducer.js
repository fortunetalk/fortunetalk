import * as actionTypes from '../actionTypes'

const initialState = {
    walletHistory: null,
    chatHistory: null,
    callHistory: null,
    fortuneHistory: null,
    courseHistory:null
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
        case actionTypes.SET_CALL_HISTORY:
            return {
                ...state,
                callHistory: payload
            }
        case actionTypes.GET_PRODUCT_HISTORY: {
            return {
                ...state,
                fortuneHistory: payload
            }
        }
        case actionTypes.GET_COURSE_HISTORY: {
            return {
                ...state,
                courseHistory: payload
            }
        }
        default:
            return state;
    }
}

export default history;