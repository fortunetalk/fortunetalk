import * as actionTypes from "../actionTypes"

export const onAddToCart = (payload) => ({
    type: actionTypes.ADD_TO_CART,
    payload
})

export const onCartDetails = (payload) => ({
    type: actionTypes.GET_CART_DETAILS,
    payload
})

