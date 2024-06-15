import * as actionTypes from '../actionTypes'

const initialState = {
    PoojaCategoryList: null,
    PoojaCategoryWaiseList: null,
    ProductCategoryList: null,
    ProductCategoryWaiseList: null,
}

const eCommerce = (state = initialState, actions) => {
    const { type, payload } = actions
    switch (type) {
        case actionTypes.GET_POOJA_CATEGORY_DATA: {
            return {
                ...state,
                PoojaCategoryList: payload
            }
        }
        case actionTypes.GET_PRODUCT_CATEGORY_DATA: {
            return {
                ...state,
                ProductCategoryList: payload
            }
        }
        case actionTypes.GET_CATEGORY_WAISE_POOJA_DATA: {
            return {
                ...state,
                PoojaCategoryWaiseList: payload
            }
        }
        case actionTypes.GET_CATEGORY_WAISE_PRODUCT_DATA: {
            return {
                ...state,
                ProductCategoryWaiseList: payload
            }
        }
        default: {
            return state
        }
    }
}

export default eCommerce