import { call, put, select, takeLeading } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes'
import { postRequest } from '../../utils/apiRequests'
import { app_api_url, customer_wallet_recharge } from '../../config/constants'
import { showToastMessage } from '../../utils/services'
import { resetToScreen } from '../../utils/navigationServices'

function* onWalletRechage(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const { payload } = actions
        const customerData = yield select(state => state.customer.customerData)

        const response = yield postRequest({
            url: app_api_url + customer_wallet_recharge,
            data: {
                customerId: customerData?._id,
                amount: parseFloat(payload)
            }
        })

        if(response?.success){
            yield put({type: actionTypes.SET_CUSTOMER_DATA, payload: response?.data})
            showToastMessage({message: 'Recharge was successfully'})
            yield call(resetToScreen, 'home')
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

export default function* paymentSaga() {
    yield takeLeading(actionTypes.ON_WALLET_RECHARGE, onWalletRechage)
}