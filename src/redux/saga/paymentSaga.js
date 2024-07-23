import * as actionTypes from '../actionTypes'
import { postRequest } from '../../utils/apiRequests'
import { showToastMessage } from '../../utils/services'
import { razorpayPayment } from '../../utils/razorpay'
import { call, put, select, takeLeading } from 'redux-saga/effects'
import { goBack, onPop, resetToScreen } from '../../utils/navigationServices'
import { app_api_url, customer_wallet_recharge } from '../../config/constants'
import socketServices from '../../utils/socket'

function* onWalletRechage(actions) {
    try {
        const { payload } = actions
        const customerData = yield select(state => state.customer.customerData)

        const rayzorPayResponse = yield razorpayPayment({ amount: payload?.amount, email: '', name: '', contact: '' })
        console.log(rayzorPayResponse)

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const response = yield postRequest({
            url: app_api_url + customer_wallet_recharge,
            data: {
                customerId: customerData?._id,
                amount: parseFloat(payload?.amount)
            }
        })

        if (response?.success) {
            yield put({ type: actionTypes.SET_CUSTOMER_DATA, payload: response?.data })
            showToastMessage({ message: 'Recharge was successfully' })
            if (payload?.type == 'wallet') {
                yield call(resetToScreen, 'home')
            } else if (payload?.type === 'wallet_recharge') {
                yield call(onPop(2))
            }else if(payload?.type === 'chat_wallet_recharge'){
                const chatData = yield select(state=>state.chat.chatData)
                socketServices.emit('updateChatDuration', {roomID: chatData?.data?.historyId, amount: parseFloat(payload?.amount)})
                yield call(onPop(2))
            }

        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* onCoursePayment(actions) {
    try {
        const { payload } = actions
        const customerData = yield select(state => state.customer.customerData)

        console.log(payload, "payment")

        const rayzorPayResponse = yield razorpayPayment({ amount: payload?.amount, email: '', name: '', contact: '' })
        console.log(rayzorPayResponse)

        if (true) {
            showToastMessage({ message: 'Payment was successfully' })
            goBack()
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}


export default function* paymentSaga() {
    yield takeLeading(actionTypes.ON_WALLET_RECHARGE, onWalletRechage)
    yield takeLeading(actionTypes.LIVE_COURSE_PAYMENT, onCoursePayment)
}