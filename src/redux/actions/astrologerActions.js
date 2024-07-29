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

export const setRecentAstrologers = payload => ({
    type: actionTypes.SET_RECENT_ASTROLOGERS,
    payload
})

export const setOnlineAstrologers = payload => ({
    type: actionTypes.SET_ONLINE_ASTROLOGERS,
    payload
})

export const onFollowUnFollowAstrologer = payload => ({
    type: actionTypes.ON_FOLLOW_UNFOLLOW_ASTROLOGERS,
    payload
})

export const checkFollowStatus = payload => ({
    type: actionTypes.CHECK_FOLLOW_STATUS,
    payload
})

export const setFollowStatus = payload => ({
    type: actionTypes.SET_FOLLOW_STATUS,
    payload
})