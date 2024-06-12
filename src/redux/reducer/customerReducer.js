import * as actionTypes from '../actionTypes'

const initialState = {
    customerData: null
}

const customer = (state = initialState, actions) => {
    const { type, payload } = actions
    switch (type) {
        case actionTypes.SET_CUSTOMER_DATA: {
            return {
                ...state,
                customerData: payload
            }
        }
        default: {
            return state
        }
    }
}

export default customer