import { call, put, select, takeLeading } from "redux-saga/effects"
import * as actionTypes from "../actionTypes"
import { sendCallInvitation } from "../../utils/zegoCall"
import { postRequest } from "../../utils/apiRequests"
import { app_api_url, get_call_invoice, initiate_zego_call } from "../../config/constants"
import { isUserRegistered, showToastMessage } from "../../utils/services"
import { navigate } from "../../utils/navigationServices"

function* sendCallRequest(actions) {
    try {
        const { navigation, astrologerId, astrologerName } = actions.payload
        const customerData = yield select(state => state.customer.customerData)
        const isRegistered = yield isUserRegistered(customerData)
        if (!isRegistered) {
            navigate('profile')
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
            return
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const response = yield postRequest({
            url: app_api_url + initiate_zego_call,
            data: {
                customerId: customerData?._id,
                astrologerId
            }
        })

        if (response?.success) {
            const callTo = [{ userID: astrologerId, userName: astrologerName ?? 'Astrologer', }]
            yield call(sendCallInvitation, { navigation, callTo, customData: response?.data?.transactionId })
        } else {
            if (response?.message == 'Insufficent Balance') {
                yield put({ type: actionTypes.SET_WALLET_ALERT_VISIBLE, payload: { visible: true, visibleFor: 'wallet_recharge' } })
            }
            showToastMessage({ message: response?.message })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })


    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getCallInvoiceData(actions) {
    try {
        const { payload } = actions
        console.log(typeof payload)
        const response = yield postRequest({
            url: app_api_url + get_call_invoice,
            data: {
                callId: payload?.callId
            }
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_CALL_INVOICE_DATA, payload: { visible: true, data: response?.data } })
        }

    } catch (e) {
        console.log(e)
    }
}

export default function* callSaga() {
    yield takeLeading(actionTypes.SEND_CALL_REQUEST, sendCallRequest)
    yield takeLeading(actionTypes.GET_CALL_INVOICE_DATA, getCallInvoiceData)
}