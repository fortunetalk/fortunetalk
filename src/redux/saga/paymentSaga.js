import * as actionTypes from '../actionTypes'
import { getRequest, postRequest } from '../../utils/apiRequests'
import { showToastMessage } from '../../utils/services'
import { razorpayPayment } from '../../utils/razorpay'
import { call, put, select, takeLeading } from 'redux-saga/effects'
import { goBack, onPop, resetToScreen } from '../../utils/navigationServices'
import { app_api_url, customer_wallet_recharge, get_customer_recharge_plans } from '../../config/constants'
import socketServices from '../../utils/socket'

function* onWalletRechage(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const customerData = yield select(state => state.customer.customerData)
        const { payload } = actions

        const rayzorPayResponse = yield razorpayPayment({ amount: payload?.amount, email: '', name: '', contact: customerData.phoneNumber })
        if(rayzorPayResponse){
            const response = yield postRequest({
                url: app_api_url + customer_wallet_recharge,
                data: {
                    customerId: customerData?._id,
                    amount: parseFloat(payload?.amount),
                    planId: payload?.planId || ''
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
        }


       

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getWalletRechargePlans(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const response = yield getRequest({
            url: app_api_url + get_customer_recharge_plans,
        })

        if (response?.success) {
            yield put({type: actionTypes.SET_WALLET_RECHARGE_PLANS, payload: response?.data})
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

export default function* paymentSaga() {
    yield takeLeading(actionTypes.ON_WALLET_RECHARGE, onWalletRechage);
    yield takeLeading(actionTypes.GET_WALLET_RECHARGE_PLANS, getWalletRechargePlans);
}