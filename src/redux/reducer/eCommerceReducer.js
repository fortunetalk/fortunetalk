import * as actionTypes from '../actionTypes'

const initialState = {
    PoojaCategoryList: null,
    poojaCategoryWaiseList: null,
    ProductCategoryList: null,
    productCategoryWaiseList: null,
    productDetailsBanner: null,
    productCategoryBanner: null,
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
                poojaCategoryWaiseList: payload
            }
        }
        case actionTypes.GET_CATEGORY_WAISE_PRODUCT_DATA: {
            return {
                ...state,
                productCategoryWaiseList: payload
            }
        }
        case actionTypes.GET_PRODUCT_DETAILS_BANNER: {
            return {
                ...state,
                productDetailsBanner: payload
            }
        }
        case actionTypes.GET_PRODUCT_CATEGORY_BANNER: {
            return {
                ...state,
                productCategoryBanner: payload
            }
        }
        default: {
            return state
        }
    }
}

export default eCommerce