import * as  actionTypes from '../actionTypes'

const initialState = {
    cart: null
}

const cart = (state = initialState, actions) => {
    const { type, payload } = actions
    switch (type) {
        case actionTypes.SET_CALL_INVOICE_DATA:
            return {
                ...state,
                callInvoiceData: payload
            }
        default:
            return state
    }
}

export default cart;
