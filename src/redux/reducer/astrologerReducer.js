import * as actionTypes from '../actionTypes'

const initialState = {
    astroChatList: null,
    astroCallList: null,
    astrologerData: null,
    astrolgoerReviewData: null,
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
    searchedAstrologerData: null,
    astrologerSearchText: '',
    offerAstrologerData: null,
    trendingAstrologerData: null,
    isFollow: false,
    astrologerFilterVisible: false,
    astrologerFilters: {
        gender: '',
        language: [],
        callPriceHighToLow: false,
        callPriceLowToHigh: false,
        chatPriceHighToLow: false,
        chatPriceLowToHigh: false,
        experienceHighToLow: false,
        experienceLowToHigh: false,
        followersHighToLow: false,
        followersLowToHigh: false,
        skillId: [],
        chatCallOfferIds: [],
    },
    activeRemedies: 'All',
    remediesData: null,
    skillData: null,
    offersData: null
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
        case actionTypes.SET_ASTROLOGER_SEARCHED_DATA: {
            return {
                ...state,
                searchedAstrologerData: payload
            }
        }
        case actionTypes.SET_ASTROLOGER_SEARCH_TEXT: {
            return {
                ...state,
                astrologerSearchText: payload
            }
        }
        case actionTypes.SET_ASTROLOGER_DETAILS: {
            return {
                ...state,
                astrologerData: payload
            }
        }
        case actionTypes.SET_ASTROLOGER_REVIEWS: {
            return {
                ...state,
                astrolgoerReviewData: payload
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
        case actionTypes.SET_FOLLOW_STATUS: {
            return {
                ...state,
                isFollow: payload
            }
        }
        case actionTypes.SET_ASTROLOGER_FILTERS_VISIBLE: {
            return {
                ...state,
                astrologerFilterVisible: payload
            }
        }
        case actionTypes.SET_ASTROLOGER_FILTERS: {
            return {
                ...state,
                astrologerFilters: { ...state.astrologerFilters, ...payload }
            }
        }
        case actionTypes.CLEAR_ASTROLOGER_FILTERS: {
            return {
                ...state,
                astrologerFilters: initialState.astrologerFilters
            }
        }
        case actionTypes.SET_ASTROLOGER_SKILLS: {
            return {
                ...state,
                skillData: payload
            }
        }

        case actionTypes.SET_ASTROLOGER_REMEDIES: {
            return {
                ...state,
                remediesData: payload
            }
        }
        case actionTypes.SET_ACTIVE_REMEDIES: {
            return {
                ...state,
                activeRemedies: payload
            }
        }
        case actionTypes.SET_ASTROLOGER_OFFERS: {
            return {
                ...state,
                offersData: payload
            }
        }

        default: {
            return state
        }
    }
}

export default astrologer