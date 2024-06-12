import { call, put, takeLeading } from 'redux-saga/effects'
import { resetToScreen } from '../../utils/navigationServices.js'
import * as actionTypes from '../actionTypes.js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { postRequest } from '../../utils/apiRequests.js'
import { app_api_url, get_splash } from '../../config/constants.js'

function* getSplash() {
    try {
        const customer = yield AsyncStorage.getItem('customerData')
        const customerData = JSON.parse(customer)
        if (customerData) {
            const response = yield postRequest({
                url: app_api_url + get_splash,
                data: {
                    customerId: customerData?._id
                }
            })
            if (response?.success) {
                yield AsyncStorage.setItem('customerData', JSON.stringify(response?.data))
                yield put({ type: actionTypes.SET_CUSTOMER_DATA, payload: response?.data })
                yield call(resetToScreen, 'home')
            }
        } else {
            yield call(resetToScreen, 'home')
        }

    } catch (e) {
        console.log(e)
    }
}

export default function* settingSaga() {
    yield takeLeading(actionTypes.GET_SPLASH, getSplash)
}