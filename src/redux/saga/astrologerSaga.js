import { put, takeLeading } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes'
import { postRequest } from '../../utils/apiRequests'
import { app_api_url, get_astrologer_details, get_astrologer_list_for_chat_call } from '../../config/constants'

function* getAstrologerChatCallList(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const { type } = actions.payload

        const response = yield postRequest({
            url: app_api_url + get_astrologer_list_for_chat_call,
            data: {
                type
            }
        })

        if (response?.success) {
            if (type === 'chat') {
                yield put({ type: actionTypes.SET_CHAT_ASTROLOGER_LIST, payload: response?.data })
            } else {
                yield put({ type: actionTypes.SET_CALL_ASTROLOGER_LIST, payload: response?.data })
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

function* getAstrologerDetails(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const { payload } = actions

        const response = yield postRequest({
            url: app_api_url + get_astrologer_details,
            data: {
                astrologerId: payload
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

export default function* astrologerSaga() {
    yield takeLeading(actionTypes.GET_CHAT_CALL_ASTROLOGER_LIST, getAstrologerChatCallList)
    yield takeLeading(actionTypes.GET_ASTROLOGER_DETAILS, getAstrologerDetails)
}