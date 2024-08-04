import * as actionTypes from '../actionTypes'

export const onWalletRechage = payload => ({
    type: actionTypes.ON_WALLET_RECHARGE,
    payload
})

export const getWalletRechargePlans = payload => ({
    type: actionTypes.GET_WALLET_RECHARGE_PLANS,
    payload
})

export const setWalletRechargePlans = payload => ({
    type: actionTypes.SET_WALLET_RECHARGE_PLANS,
    payload
})