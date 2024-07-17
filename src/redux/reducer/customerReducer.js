import * as actionTypes from '../actionTypes'

const initialState = {
    customerData: null,
    blogs: null,
    testimonials: null
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
        case actionTypes.SET_BLOGS: {
            return {
                ...state,
                blogs: payload
            }
        }
        case actionTypes.SET_TESTIMONIALS: {
            return {
                ...state,
                testimonials: payload
            }
        }
        default: {
            return state
        }
    }
}

export default customer