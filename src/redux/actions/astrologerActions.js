import * as actionTypes from '../actionTypes.js'

export const getChatCallAstrologerList = payload => ({
    type: actionTypes.GET_CHAT_CALL_ASTROLOGER_LIST,
    payload
})

export const setChatAstrologerList = payload => ({
    type: actionTypes.SET_CHAT_ASTROLOGER_LIST,
    payload
})

export const setCallAstrologerList = payload => ({
    type: actionTypes.SET_CALL_ASTROLOGER_LIST,
    payload
})

export const getAstrologerDetails = payload => ({
    type: actionTypes.GET_ASTROLOGER_DETAILS,
    payload
})

export const setAstrologerDetails = payload => ({
    type: actionTypes.SET_ASTROLOGER_DETAILS,
    payload
})