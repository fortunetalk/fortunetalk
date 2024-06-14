import * as actionTypes from '../actionTypes'

const initialState = {
    categoryList: null,
}

const eCommerce = (state = initialState, actions) => {
    const { type, payload } = actions
    switch (type) {
        case actionTypes.Get_ECOMMERCE_CATEGORY_DATA: {
            return {
                ...state,
                categoryList: payload
            }
        }
        default: {
            return state
        }
    }
}

export default eCommerce