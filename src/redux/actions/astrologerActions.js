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

export const getAstrologerReviews = payload => ({
    type: actionTypes.GET_ASTROLOGER_REVIEWS,
    payload
})

export const setAstrologerReviews = payload => ({
    type: actionTypes.SET_ASTROLOGER_REVIEWS,
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

export const setAstrologerFiltersVisible = payload => ({
    type: actionTypes.SET_ASTROLOGER_FILTERS_VISIBLE,
    payload
})

export const setAstrologerFilters = payload => ({
    type: actionTypes.SET_ASTROLOGER_FILTERS,
    payload
})

export const clearAstrologerFilters = payload => ({
    type: actionTypes.CLEAR_ASTROLOGER_FILTERS,
    payload
})

export const setAstrologerSkills = payload => ({
    type: actionTypes.SET_ASTROLOGER_SKILLS,
    payload
})

export const setAstrologerRemedies = payload => ({
    type: actionTypes.SET_ASTROLOGER_REMEDIES,
    payload
})

export const setActiveRemedies = payload => ({
    type: actionTypes.SET_ACTIVE_REMEDIES,
    payload
})

export const setAstrologerOffers = payload => ({
    type: actionTypes.SET_ASTROLOGER_OFFERS,
    payload
})

export const onAstrologerSearch = payload => ({
    type: actionTypes.ON_ASTROLOGER_SEARCH,
    payload
})

export const setAstrologerSearchedData = payload => ({
    type: actionTypes.SET_ASTROLOGER_SEARCHED_DATA,
    payload
})

export const setAstrolgoerSearchText = payload => ({
    type: actionTypes.SET_ASTROLOGER_SEARCH_TEXT,
    payload
})