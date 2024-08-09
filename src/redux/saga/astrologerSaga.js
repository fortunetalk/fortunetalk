import { put, select, takeLeading } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes'
import { getRequest, postRequest } from '../../utils/apiRequests'
import { app_api_url, astrologer_rating, call_banner, chat_banner, check_customer_following, follow_astrologer, get_astrologer_details, get_astrologer_list_for_chat_call, get_astrologer_offers, get_astrologer_remedies, get_astrologer_reviews, get_astrologer_skills, search_astrolgoer_for_chat_call } from '../../config/constants'
import { resetToScreen } from '../../utils/navigationServices'
import { showToastMessage } from '../../utils/services'

function* getAstrologerChatCallList(actions) {
    try {
        const { type, remediesId, page = 1, isRefreshing = false, isLoadingMore = false } = actions.payload
        if (isRefreshing) yield put({ type: actionTypes.SET_IS_REFRECING, payload: true })
        else if (isLoadingMore) yield put({ type: actionTypes.SET_IS_LOADING_MORE, payload: true })
        else yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const customerData = yield select(state => state.customer.customerData)
        const skillData = yield select(state => state.astrologer.skillData)
        const offersData = yield select(state => state.astrologer.offersData)
        const remediesData = yield select(state => state.astrologer.remediesData)
        const astrologerFilters = yield select(state => state.astrologer.astrologerFilters)
        const activeRemedies = yield select(state => state.astrologer.activeRemedies)
        const chatBannerData = yield select(state => state.chat.chatBannerData)
        const callBannerData = yield select(state => state.call.callBannerData)

        if (!remediesData) {
            const response = yield getRequest({
                url: app_api_url + get_astrologer_remedies,
            })

            if (response?.success) {
                yield put({ type: actionTypes.SET_ASTROLOGER_REMEDIES, payload: response?.data })
            }

        }

        const response = yield postRequest({
            url: app_api_url + get_astrologer_list_for_chat_call,
            data: {
                page,
                type,
                remediesId: activeRemedies,
                customerId: customerData?._id,
                ...astrologerFilters
            }
        })

        if (response?.success) {
            if (type === 'chat') {
                const astroChatList = yield select(state => state.astrologer.astroChatList)
                if (astroChatList && page != 1) {
                    yield put({ type: actionTypes.SET_CHAT_ASTROLOGER_LIST, payload: { ...response?.data, docs: [...astroChatList?.docs, ...response?.data?.docs] } })
                } else {
                    yield put({ type: actionTypes.SET_CHAT_ASTROLOGER_LIST, payload: response?.data })
                }
            } else {
                const astroCallList = yield select(state => state.astrologer.astroCallList)
                if (astroCallList && page != 1) {
                    yield put({ type: actionTypes.SET_CALL_ASTROLOGER_LIST, payload: { ...response?.data, docs: [...astroCallList?.docs, ...response?.data?.docs] } })
                } else {
                    yield put({ type: actionTypes.SET_CALL_ASTROLOGER_LIST, payload: response?.data })
                }
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING_MORE, payload: false })
        yield put({ type: actionTypes.SET_IS_REFRECING, payload: false })

        if (!skillData) {
            const response = yield getRequest({
                url: app_api_url + get_astrologer_skills,
            })

            if (response?.success) {
                yield put({ type: actionTypes.SET_ASTROLOGER_SKILLS, payload: response?.data })
            }

        }

        if (!offersData) {
            const response = yield getRequest({
                url: app_api_url + get_astrologer_offers,
            })

            if (response?.success) {
                yield put({ type: actionTypes.SET_ASTROLOGER_OFFERS, payload: response?.data })
            }

        }

        if (!callBannerData) {
            const response = yield getRequest({
                url: app_api_url + call_banner,
            })

            if (response?.success) {
                yield put({ type: actionTypes.SET_CALL_BANNER_DATA, payload: response?.data })
            }
        }
        if (!chatBannerData) {
            const response = yield getRequest({
                url: app_api_url + chat_banner,
            })

            if (response?.success) {
                yield put({ type: actionTypes.SET_CHAT_BANNER_DATA, payload: response?.data })
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        yield put({ type: actionTypes.SET_IS_LOADING_MORE, payload: false })
        yield put({ type: actionTypes.SET_IS_REFRECING, payload: false })
        console.log(e)
    }
}

function* onAstrologerSearch(actions) {
    try {
        const { page = 1, isLoadingMore = false } = actions.payload
        console.log(actions)
        if (isLoadingMore) {
            yield put({ type: actionTypes.SET_IS_LOADING_MORE, payload: true })
        }
        else {
            yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        }
        const customerData = yield select(state => state.customer.customerData)
        const searchText = yield select(state => state.astrologer.astrologerSearchText)
        const response = yield postRequest({
            url: app_api_url + search_astrolgoer_for_chat_call,
            data: {
                page,
                search: searchText,
                customerId: customerData?._id,
            }
        })

        if (response?.success) {
            const searchedAstrologerData = yield select(state => state.astrologer.searchedAstrologerData)
            if (searchedAstrologerData && page != 1) {
                yield put({ type: actionTypes.SET_ASTROLOGER_SEARCHED_DATA, payload: { ...response?.data, docs: [...searchedAstrologerData?.docs, ...response?.data?.docs] } })
            } else {
                yield put({ type: actionTypes.SET_ASTROLOGER_SEARCHED_DATA, payload: response?.data })
            }
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        yield put({ type: actionTypes.SET_IS_LOADING_MORE, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        yield put({ type: actionTypes.SET_IS_LOADING_MORE, payload: false })

        console.log(e)
    }
}

function* getAstrologerDetails(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const { payload } = actions
        const customerData = yield select(state => state.customer.customerData)
        const response = yield postRequest({
            url: app_api_url + get_astrologer_details,
            data: {
                astrologerId: payload,
            }
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_ASTROLOGER_DETAILS, payload: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

function* getAstrologerReviews(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING_MORE, payload: true })

        const { payload } = actions
        const response = yield postRequest({
            url: app_api_url + get_astrologer_reviews,
            data: payload
        })

        if (response?.success) {
            const reviews = yield select(state => state.astrologer.astrolgoerReviewData)
            if (reviews) {
                yield put({ type: actionTypes.SET_ASTROLOGER_REVIEWS, payload: { ...response?.data, reviews: [...reviews?.reviews], } })
            } else {
                yield put({ type: actionTypes.SET_ASTROLOGER_REVIEWS, payload: response?.data })
            }

        }

        yield put({ type: actionTypes.SET_IS_LOADING_MORE, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING_MORE, payload: false })
        console.log(e)
    }
}

function* onAstrologerRating(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const { payload } = actions
        const customerData = yield select(state => state.customer.customerData)

        const response = yield postRequest({
            url: app_api_url + astrologer_rating,
            data: {
                ...payload,
                customerId: customerData?._id
            }
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_ASTROLOGER_RATING_DATA, payload: { visible: false, data: null } })
            resetToScreen('home')
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

function* onFollowUnFollowAstrologer(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const { payload } = actions
        const customerData = yield select(state => state.customer.customerData)

        const response = yield postRequest({
            url: app_api_url + follow_astrologer,
            data: {
                astrologerId: payload,
                customerId: customerData?._id
            }
        })

        if (response?.success) {
            showToastMessage({ message: response?.message })
            yield put({ type: actionTypes.CHECK_FOLLOW_STATUS, payload })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

function* checkFollowStatus(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const { payload } = actions
        const customerData = yield select(state => state.customer.customerData)

        const response = yield postRequest({
            url: app_api_url + check_customer_following,
            data: {
                astrologerId: payload,
                customerId: customerData?._id
            }
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_FOLLOW_STATUS, payload: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

export default function* astrologerSaga() {
    yield takeLeading(actionTypes.GET_CHAT_CALL_ASTROLOGER_LIST, getAstrologerChatCallList)
    yield takeLeading(actionTypes.ON_ASTROLOGER_SEARCH, onAstrologerSearch)
    yield takeLeading(actionTypes.GET_ASTROLOGER_DETAILS, getAstrologerDetails)
    yield takeLeading(actionTypes.GET_ASTROLOGER_REVIEWS, getAstrologerReviews)
    yield takeLeading(actionTypes.ON_ASTROLOGER_RATING, onAstrologerRating)
    yield takeLeading(actionTypes.ON_FOLLOW_UNFOLLOW_ASTROLOGERS, onFollowUnFollowAstrologer)
    yield takeLeading(actionTypes.CHECK_FOLLOW_STATUS, checkFollowStatus)
}