import * as actionTypes from '../actionTypes'

export const onWalletRechage = payload => ({
    type: actionTypes.ON_WALLET_RECHARGE,
    payload
})

export const onCoursesPayment = payload => ({
    type: actionTypes.LIVE_COURSE_PAYMENT,
    payload
})
