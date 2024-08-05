import * as actionTypes from "../actionTypes"
import { postRequest } from "../../utils/apiRequests"
import { put, select, takeLeading } from "redux-saga/effects"
import { app_api_url, get_mcq } from "../../config/constants"

function* getMCQ() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)

        const response = yield postRequest({
            url: app_api_url + get_mcq,
            data: {
                customerId: customerData?._id,
            }
        })

        // console.log(" response?.data  =====>>>>",  response?.data)

        if (response?.success) {
            yield put({ type: actionTypes.GET_MCQ, payload: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

export default function* McqSaga() {
    yield takeLeading(actionTypes.GET_MCQ, getMCQ)
}