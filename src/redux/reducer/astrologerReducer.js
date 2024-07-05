import * as actionTypes from '../actionTypes'

const initialState = {
    astroChatList: null,
    astroCallList: null,
    astrologerData: null,
    chatRequestModalData: {
        visible: false,
        data: null
    }
}

const astrologer = (state = initialState, actions) => {
    const { type, payload } = actions
    switch (type) {
        case actionTypes.SET_CHAT_ASTROLOGER_LIST: {
            return {
                ...state,
                astroChatList: payload
            }
        }
        case actionTypes.SET_CALL_ASTROLOGER_LIST: {
            return {
                ...state,
                astroCallList: payload
            }
        }
        case actionTypes.SET_ASTROLOGER_DETAILS: {
            return {
                ...state,
                astrologerData: payload
            }
        }
        case actionTypes.SET_CHAT_REQUEST_MODAL_DATA: {
            return {
                ...state,
                chatRequestModalData: payload
            }
        }
        default: {
            return state
        }
    }
}

export default astrologer