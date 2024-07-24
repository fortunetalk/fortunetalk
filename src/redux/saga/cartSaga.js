import * as actionTypes from "../actionTypes"
import { postRequest } from "../../utils/apiRequests"
import { showToastMessage } from "../../utils/services"
import { put, select, takeLeading } from "redux-saga/effects"
import { add_to_cart, app_api_url } from "../../config/constants"

function* addToCart(actions) {
    try {
        const { payload } = actions
        const customerData = yield select(state => state.customer.customerData)

        const response = yield postRequest({
            url: app_api_url + add_to_cart,
            data: {
                customerId: customerData?._id,
                productId: payload.productId,
                quantity: payload.quantity
            }
        })

        if (response?.success) {
            yield put(actionTypes.ADD_TO_CART, response?.data)
        } else {
            showToastMessage({ message: response?.message })
        }

    } catch (e) {
        console.log(e)
    }
}

export default function* cartSaga() {
    yield takeLeading(actionTypes.ADD_TO_CART, addToCart)
}