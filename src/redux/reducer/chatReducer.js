import * as actionTypes from '../actionTypes'

const initialState = {
    chatRequestVisible: false,
    chatMessages: null,
    chatData: null,
    chatTimerCountDown: 0,
    attachments: {
        visible: false,
        data: null,
        type: null
    }
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
        case actionTypes.SET_CHAT_TIMER_COUNTDOWN:
            return {
                ...state,
                chatTimerCountDown: payload
            }
        case actionTypes.SET_ATTACHMENT_DATA:
            return {
                ...state,
                attachments: payload
            }
        default: {
            return state
        }
    }
}

export default chat