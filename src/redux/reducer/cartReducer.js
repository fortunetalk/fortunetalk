import * as  actionTypes from '../actionTypes'

const initialState = {
    cartDetails: null,
}

const cart = (state = initialState, actions) => {
    const { type, payload } = actions
    switch (type) {
        case actionTypes.GET_CART_DETAILS:
            return {
                ...state,
                cartDetails: payload
            }
        default:
            return state
    }
}

export default cart;
