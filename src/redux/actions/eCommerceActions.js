import * as actionTypes from "../actionTypes"

export const getPoojaCategoryList = payload => ({
    type: actionTypes.GET_POOJA_CATEGORY_DATA,
    payload
})

export const getPoojaCategoryWaiseList = payload => ({
    type: actionTypes.GET_CATEGORY_WAISE_POOJA_DATA,
    payload
})

export const getProductCategoryList = payload => ({
    type: actionTypes.GET_PRODUCT_CATEGORY_DATA,
    payload
})

export const getProductCategoryWaiseList = payload => ({
    type: actionTypes.GET_CATEGORY_WAISE_PRODUCT_DATA,
    payload
})