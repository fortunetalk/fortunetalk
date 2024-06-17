import { put, takeLeading } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes'
import { getRequest } from '../../utils/apiRequests'
import {
    app_api_url,
    get_pooja_category,
    get_product_category,
    get_pooja_category_waise,
    get_product_category_waise,
    get_product_details_banner,
    get_product_category_banner
} from '../../config/constants'

function* getPoojaCategoryList(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const response = yield getRequest({
            url: app_api_url + get_pooja_category,
        })

        if (response?.success) {
            yield put({ type: actionTypes.GET_POOJA_CATEGORY_DATA, payload: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

function* getPoojaCategoryWaiseList(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const { id } = actions.payload

        const response = yield getRequest({
            url: app_api_url + get_pooja_category_waise + id,
        })

        console.log({
            url: app_api_url + get_pooja_category_waise + id,
        })

        if (response?.success) {
            yield put({ type: actionTypes.GET_CATEGORY_WAISE_POOJA_DATA, payload: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

function* getProductCategoryList(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const response = yield getRequest({
            url: app_api_url + get_product_category,
        })

        if (response?.success) {
            yield put({ type: actionTypes.GET_PRODUCT_CATEGORY_DATA, payload: response?.data })
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}
function* getProductCategoryWaiseList(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const { id } = actions.payload

        const response = yield getRequest({
            url: app_api_url + get_product_category_waise + id,
        })

        if (response?.success) {
            yield put({ type: actionTypes.GET_CATEGORY_WAISE_PRODUCT_DATA, payload: response?.data })
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

function* getProductDetailsBanner() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const response = yield getRequest({
            url: app_api_url + get_product_details_banner,
        })

        if (response?.success) {
            yield put({ type: actionTypes.GET_PRODUCT_DETAILS_BANNER, payload: response?.data })
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

function* getProductCategoryBanner() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const response = yield getRequest({
            url: app_api_url + get_product_category_banner,
        })

        if (response?.success) {
            yield put({ type: actionTypes.GET_PRODUCT_CATEGORY_BANNER, payload: response?.data })
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}


export default function* eCommerceSaga() {
    yield takeLeading(actionTypes.GET_POOJA_CATEGORY_DATA, getPoojaCategoryList)
    yield takeLeading(actionTypes.GET_CATEGORY_WAISE_POOJA_DATA, getPoojaCategoryWaiseList)

    yield takeLeading(actionTypes.GET_PRODUCT_CATEGORY_DATA, getProductCategoryList)
    yield takeLeading(actionTypes.GET_CATEGORY_WAISE_PRODUCT_DATA, getProductCategoryWaiseList)

    yield takeLeading(actionTypes.GET_PRODUCT_DETAILS_BANNER, getProductDetailsBanner)
    yield takeLeading(actionTypes.GET_PRODUCT_CATEGORY_BANNER, getProductCategoryBanner)
}