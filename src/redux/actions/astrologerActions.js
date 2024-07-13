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

export const setChatRequestModalData = payload => ({
    type: actionTypes.SET_CHAT_REQUEST_MODAL_DATA,
    payload
})

export const setAstrologerRatingData = payload => ({
    type: actionTypes.SET_ASTROLOGER_RATING_DATA,
    payload
})

export const setWalletAlertVisible = payload => ({
    type: actionTypes.SET_WALLET_ALERT_VISIBLE,
    payload
})

export const onAstrologerRating = payload => ({
    type: actionTypes.ON_ASTROLOGER_RATING,
    payload
})