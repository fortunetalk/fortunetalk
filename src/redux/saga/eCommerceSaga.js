import { put, takeLeading } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes'
import { getRequest } from '../../utils/apiRequests'
import { app_api_url, get_ecommerce_category } from '../../config/constants'

function* getEcommerceCategoryList(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const { type } = actions.payload

        const response = yield getRequest({
            url: app_api_url + get_ecommerce_category,
            data: {
                type
            }
        })

        console.log("response===>>>>", response)

        if (response?.success) {
            yield put({ type: actionTypes.Get_ECOMMERCE_CATEGORY_DATA, payload: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

export default function* eCommerceSaga() {
    yield takeLeading(actionTypes.Get_ECOMMERCE_CATEGORY_DATA, getEcommerceCategoryList)
}