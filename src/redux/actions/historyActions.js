import * as actionTypes from '../actionTypes'

export const getWalletHistory = payload => ({
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

export const getCallHistory = payload => ({
    type: actionTypes.GET_CALL_HISTORY,
    payload
})

export const setCallHistory = payload => ({
    type: actionTypes.SET_CALL_HISTORY,
    payload
})

export const onProductHistory = payload => ({
    type: actionTypes.GET_PRODUCT_HISTORY,
    payload
})

export const onCourseHistory = payload => ({
    type: actionTypes.GET_COURSE_HISTORY,
    payload
})

