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

export const getProductDetailsBanner = payload => ({
    type: actionTypes.GET_PRODUCT_DETAILS_BANNER,
    payload
})

export const getPoojaDetailsBanner = payload => ({
    type: actionTypes.GET_POOJA_DETAILS_BANNER,
    payload
})

export const getProductCategoryBanner = payload => ({
    type: actionTypes.GET_PRODUCT_CATEGORY_BANNER,
    payload
})

export const onProductPayment = payload => ({
    type: actionTypes.PRODUCT_PAYMENT,
    payload
})

export const onProductAddressAdd = payload => ({
    type: actionTypes.PRODUCT_CUSTOMER_ADD_ADDRESS,
    payload
})
