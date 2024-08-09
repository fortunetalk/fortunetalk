import * as actionTypes from '../actionTypes'

const initialState = {
    chatBannerData: null,
    chatRequestVisible: false,
    chatMessages: null,
    chatData: null,
    chatTimerCountDown: 0,
    attachments: {
        visible: false,
        data: null,
        type: null
    },
    chatInvoiceVisible: false,
    chatInvoiceData: null,
    chatWalletAlert: {
        visible: false,
        chatId: null
    }
}

const chat = (state = initialState, actions) => {
    const { type, payload } = actions
    switch (type) {
        case actionTypes.SET_CHAT_BANNER_DATA: {
            return {
                ...state,
                chatBannerData: payload
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
        case actionTypes.SET_CHAT_INVOICE_VISIBLE:
            return {
                ...state,
                chatInvoiceVisible: payload
            }
        case actionTypes.SET_CHAT_WALLET_ALERT:
            return {
                ...state,
                chatInvoiceVisible: payload
            }
        case actionTypes.SET_CHAT_INVOICE_DATA:
            return {
                ...state,
                chatInvoiceData: payload
            }
        default: {
            return state
        }
    }
}

export default chat