import { call, put, select, takeLeading } from 'redux-saga/effects'
import { resetToScreen } from '../../utils/navigationServices.js'
import * as actionTypes from '../actionTypes.js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { postRequest } from '../../utils/apiRequests.js'
import { app_api_url, get_online_astrologer, get_recent_astrologer, get_splash } from '../../config/constants.js'
import { onUserLogin } from '../../utils/zegoCall.js'

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
                yield onUserLogin("1", 'Ranjeet Kumar')
                yield call(resetToScreen, 'home')
            } else {
                yield call(resetToScreen, 'login')
            }
            // console.log("response?.success" , response)
        } else {
            yield call(resetToScreen, 'login')
        }

    } catch (e) {
        console.log(e)
    }
}

function* getCustomerData() {
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
            }
        }

    } catch (e) {
        console.log(e)
    }
}

function* getHomeData() {
    try {
        const customer = yield select(state => state.customer.customerData)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const recentResponse = yield postRequest({
            url: app_api_url + get_recent_astrologer,
            data: {
                customerId: customer?._id
            }
        })

        const onlineResponse = yield postRequest({
            url: app_api_url + get_online_astrologer,
            data: {
                "page": 1,
                "limit": 10
            }
        })

        if (recentResponse?.success) {
            yield put({ type: actionTypes.SET_RECENT_ASTROLOGERS, payload: recentResponse?.data })
        }

        if (onlineResponse?.success) {
            yield put({ type: actionTypes.SET_ONLINE_ASTROLOGERS, payload: onlineResponse?.data?.docs })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })



    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}


export default function* settingSaga() {
    yield takeLeading(actionTypes.GET_SPLASH, getSplash)
    yield takeLeading(actionTypes.GET_CUSTOMER_DATA, getCustomerData)
    yield takeLeading(actionTypes.GET_HOME_DATA, getHomeData)
}