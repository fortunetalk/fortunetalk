import * as actionTypes from "../actionTypes"
import { getRequest, postRequest } from "../../utils/apiRequests"
import { showToastMessage } from "../../utils/services"
import { put, select, takeLeading } from "redux-saga/effects"
import { add_to_cart, app_api_url, get_cart_details } from "../../config/constants"

function* addToCart(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)
        const { payload } = actions

        // console.log("payload ===>>", payload)
        // console.log("  url: app_api_url + add_to_cart, ===>>", {url: app_api_url + add_to_cart})

        const response = yield postRequest({
            url: app_api_url + add_to_cart,
            data: {
                customerId: customerData?._id,
                productId: payload.productId,
                quantity: payload.quantity
            }
        })

        if (response?.success) {
            showToastMessage({ message: "Product Added to cart Successfully" })
        } else {
            showToastMessage({ message: response?.message })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getCartDetails() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)

        // console.log(" url: app_api_url + get_cart_details", { url: app_api_url + get_cart_details })

        const response = yield postRequest({
            url: app_api_url + get_cart_details,
            data: {
                customerId: customerData?._id,
            }
        })

        // console.log("customerId =====>>>>", { customerId: customerData?._id })
        // console.log(" response?.data  =====>>>>", { payload: response?.data })

        if (response?.success) {
            yield put({ type: actionTypes.GET_CART_DETAILS, payload: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

export default function* cartSaga() {
    yield takeLeading(actionTypes.ADD_TO_CART, addToCart)
    yield takeLeading(actionTypes.GET_CART_DETAILS, getCartDetails)
}