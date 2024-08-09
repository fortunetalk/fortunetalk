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
    get_product_category_banner,
    get_pooja_category_banner,
    get_pooja_details_banner,
    add_product_customer_address,
} from '../../config/constants'

function* getPoojaCategoryList() {
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

function* getProductCategoryList() {
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

function* getPoojaDetailsBanner() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const response = yield getRequest({
            url: app_api_url + get_pooja_details_banner,
        })

        if (response?.success) {
            yield put({ type: actionTypes.GET_POOJA_DETAILS_BANNER, payload: response?.data })
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

function* getPoojaCategoryBanner() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const response = yield getRequest({
            url: app_api_url + get_pooja_category_banner,
        })

        if (response?.success) {
            yield put({ type: actionTypes.GET_POOJA_CATEGORY_BANNER, payload: response?.data })
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}


function* addProductCustomerAddress() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const response = yield getRequest({
            url: app_api_url + add_product_customer_address,
        })

        if (response?.success) {
            yield put({ type: actionTypes.PRODUCT_CUSTOMER_ADD_ADDRESS, payload: response?.data })

        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

function* onProductPayment(actions) {
    try {
        const { payload } = actions
        const customerData = yield select(state => state.customer.customerData)
        // console.log(payload, "payment")

        const rayzorPayResponse = yield razorpayPayment({
            amount: parseInt(payload?.amount),
            email: '',
            name: '',
            contact: ''
        })
        console.log("rayzorPayResponse  ====>>>", rayzorPayResponse)

        const response = yield postRequest({
            url: app_api_url + live_course_payment,
            data: {
                customerId: customerData?._id,
                amount: parseFloat(payload?.amount),
                isPartial: true,
                liveId: payload.liveClassId
            }
        })

        if (response?.success) {
            goBack()
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

export default function* eCommerceSaga() {
    yield takeLeading(actionTypes.GET_POOJA_CATEGORY_DATA, getPoojaCategoryList)
    yield takeLeading(actionTypes.GET_CATEGORY_WAISE_POOJA_DATA, getPoojaCategoryWaiseList)

    yield takeLeading(actionTypes.GET_PRODUCT_CATEGORY_DATA, getProductCategoryList)
    yield takeLeading(actionTypes.GET_CATEGORY_WAISE_PRODUCT_DATA, getProductCategoryWaiseList)

    yield takeLeading(actionTypes.GET_PRODUCT_DETAILS_BANNER, getProductDetailsBanner)
    yield takeLeading(actionTypes.GET_PRODUCT_CATEGORY_BANNER, getProductCategoryBanner)

    yield takeLeading(actionTypes.GET_POOJA_DETAILS_BANNER, getPoojaDetailsBanner)
    yield takeLeading(actionTypes.GET_POOJA_CATEGORY_BANNER, getPoojaCategoryBanner)
    yield takeLeading(actionTypes.PRODUCT_PAYMENT, onProductPayment)

    yield takeLeading(actionTypes.PRODUCT_CUSTOMER_ADD_ADDRESS, addProductCustomerAddress)

}