import * as actionTypes from '../actionTypes'

export const getWalletHistory = payload =>({
    type: actionTypes.GET_WALLET_HISTORY,
    payload
})

export const setWalletHistory = payload => ({
    type: actionTypes.SET_WALLET_HISTORY,
    payload
})

export const getChatHistory = payload => ({
    type: actionTypes.GET_CHAT_HISTORY,
    payload
})

export const setChatHistory = payload => ({
    type: actionTypes.SET_CHAT_HISTORY,
    payload
})