import * as actionTypes from '../actionTypes'

const initialState = {
    chatRequestVisible: false,
    chatMessages: null,
    chatData: null
}

const chat = (state = initialState, actions) => {
    const { type, payload } = actions
    switch (type) {
        case actionTypes.SET_CHAT_REQUEST_VISIBLE: {
            return {
                ...state,
                chatRequestVisible: payload
            }
        }
        case actionTypes.SET_CHAT_MESSAGES: {
            return {
                ...state,
                chatMessages: payload
            }
        }
        case actionTypes.SET_CHAT_DATA: {
            return {
                ...state,
                chatData: payload
            }
        }
        default: {
            return state
        }
    }
}

export default chat