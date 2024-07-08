import { put, select, takeLeading } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes'
import { postRequest } from '../../utils/apiRequests'
import { app_api_url, get_customer_chat_history, get_customer_wallet_history } from '../../config/constants'


function* getWalletHistory() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)
        const response = yield postRequest({
            url: app_api_url + get_customer_wallet_history,
            data: {
                customerId: customerData?._id
            }
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_WALLET_HISTORY, payload: response.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getChatHistory() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)
        const response = yield postRequest({
            url: app_api_url + get_customer_chat_history,
            data: {
                customerId: customerData?._id
            }
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_CHAT_HISTORY, payload: response.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

export default function* historySaga() {
    yield takeLeading(actionTypes.GET_WALLET_HISTORY, getWalletHistory)
    yield takeLeading(actionTypes.GET_CHAT_HISTORY, getChatHistory)
}