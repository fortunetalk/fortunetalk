import * as actionTypes from '../actionTypes'

const initialState = {
    astroChatList: null,
    astroCallList: null,
    astrologerData: null,
    chatRequestModalData: {
        visible: false,
        data: null
    },
    astrologerRatingData: {
        visible: false,
        data: null
    },
    walletAlertVisible: {
        visible: false,
        visibleFor: ''
    },
    recentAstrologerData: null,
    onlineAstrologerData: null,
    offerAstrologerData: null,
    trendingAstrologerData: null,
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
        case actionTypes.SET_ASTROLOGER_RATING_DATA: {
            return {
                ...state,
                astrologerRatingData: payload
            }
        }
        case actionTypes.SET_WALLET_ALERT_VISIBLE: {
            return {
                ...state,
                walletAlertVisible: payload
            }
        }
        case actionTypes.SET_RECENT_ASTROLOGERS: {
            return {
                ...state,
                recentAstrologerData: payload
            }
        }
        case actionTypes.SET_ONLINE_ASTROLOGERS: {
            return {
                ...state,
                onlineAstrologerData: payload
            }
        }
        case actionTypes.SET_OFFER_ASTROLOGERS: {
            return {
                ...state,
                offerAstrologerData: payload
            }
        }
        case actionTypes.SET_TRENDING_ASTROLOGERS: {
            return {
                ...state,
                trendingAstrologerData: payload
            }
        }
        default: {
            return state
        }
    }
}

export default astrologer