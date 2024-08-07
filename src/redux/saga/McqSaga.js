import * as actionTypes from "../actionTypes"
import { postRequest } from "../../utils/apiRequests"
import { showToastMessage } from "../../utils/services"
import { call, put, takeLeading } from "redux-saga/effects"
import { app_api_url, get_mcq, submit_mcq, total_attempted_time_mcq } from "../../config/constants"

function* getMCQ(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const { payload } = actions

        const response = yield postRequest({
            url: app_api_url + get_mcq,
            data: payload
        })

        // console.log(" response?.data  =====>>>>",  response?.data)

        if (response?.success) {
            yield put({ type: actionTypes.GET_MCQ, payload: response?.data })
            yield put({ type: actionTypes.SUBMIT_MCQ, payload: null })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* submitMCQ(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const { payload } = actions

        console.log("payload submitMCQ ====>>>>>", payload)
        // console.log("app_api_url + submit_mcq", app_api_url + submit_mcq)

        const response = yield postRequest({
            url: app_api_url + submit_mcq,
            data: payload
        })

        console.log("response =====>>>>", response)

        if (response?.success) {
            yield put({ type: actionTypes.SUBMIT_MCQ, payload: response })
            yield put({ type: actionTypes.SUCCESS_MCQ, payload: true })
            yield call(showToastMessage, { message: response?.message })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* attemptedTimesMCQ(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const { payload } = actions

        console.log("payload submitMCQ ====>>>>>", payload)
        // console.log("app_api_url + submit_mcq", app_api_url + submit_mcq)

        const response = yield postRequest({
            url: app_api_url + total_attempted_time_mcq,
            data: payload
        })

        console.log("response =====>>>>", response)

        if (response?.success) {
            yield put({ type: actionTypes.ATTEMPTED_MCQ_TIMES, payload: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

export default function* McqSaga() {
    yield takeLeading(actionTypes.GET_MCQ, getMCQ)
    yield takeLeading(actionTypes.SUBMIT_MCQ, submitMCQ)
    yield takeLeading(actionTypes.ATTEMPTED_MCQ_TIMES, attemptedTimesMCQ)
}