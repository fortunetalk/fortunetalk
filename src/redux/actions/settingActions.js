import * as actionTypes from '../actionTypes';

export const setIsLoading = payload => ({
    type: actionTypes.SET_IS_LOADING,
    payload
})

export const setIsReferecing = payload => ({
    type: actionTypes.SET_IS_REFRECING,
    payload
})

export const setIsLoadingMore = payload => ({
    type: actionTypes.SET_IS_LOADING_MORE,
    payload
})

export const getSplash = payload => ({
    type: actionTypes.GET_SPLASH,
    payload
})

export const setLocationData = payload => ({
    type: actionTypes.SET_LOCATION_DATA,
    payload
})

export const getCustomerData = payload => ({
    type: actionTypes.GET_CUSTOMER_DATA,
    payload
})

export const setCustomerData = payload => ({
    type: actionTypes.SET_CUSTOMER_DATA,
    payload
})

export const setTabVisible = payload => ({
    type: actionTypes.SET_TAB_VISIBLE,
    payload
})

export const getHomeData = payload => ({
    type: actionTypes.GET_HOME_DATA,
    payload
})
