import { call, put, select, takeLeading } from "redux-saga/effects"
import * as actionTypes from "../actionTypes"
import { sendCallInvitation } from "../../utils/zegoCall"
import { postRequest } from "../../utils/apiRequests"
import { app_api_url, get_call_invoice, initiate_zego_call } from "../../config/constants"
import { showToastMessage } from "../../utils/services"

function* sendCallRequest(actions) {
    try {
        const { navigation, astrologerId, astrologerName } = actions.payload
        const customerData = yield select(state => state.customer.customerData)
        const response = yield postRequest({
            url: app_api_url + initiate_zego_call,
            data: {
                customerId: customerData?._id,
                astrologerId
            }
        })

        if (response?.success) {
            const callTo = [{ userID: astrologerId, userName: astrologerName ?? 'Astrologer', }]
            console.log(callTo)
            yield call(sendCallInvitation, { navigation, callTo, customData: response?.data?.transactionId })
        }else{
            showToastMessage({message: response?.message})
        }

        console.log(response)


    } catch (e) {
        console.log(e)
    }
}

function* getCallInvoiceData(actions){
    try{
        const {payload} = actions
        console.log(typeof payload)
        const response = yield postRequest({
            url: app_api_url + get_call_invoice,
            data: {
                callId: payload?.callId
            }
        })

        console.log(response)

        if(response?.success){
            yield put({type: actionTypes.SET_CALL_INVOICE_DATA, payload: {visible: true, data: response?.data}})
        }

    }catch(e){
        console.log(e)
    }
}

export default function* callSaga() {
    yield takeLeading(actionTypes.SEND_CALL_REQUEST, sendCallRequest)
    yield takeLeading(actionTypes.GET_CALL_INVOICE_DATA, getCallInvoiceData)
}