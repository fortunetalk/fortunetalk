import * as  actionTypes from '../actionTypes'

const initialState = {
    callBannerData: null,
    callInvoiceData: {
        visible: false,
        data: null
    }
}

const call = (state = initialState, actions) => {
    const { type, payload } = actions
    switch (type) {
        case actionTypes.SET_CALL_INVOICE_DATA:
            return {
                ...state,
                callInvoiceData: payload
            }
        case actionTypes.SET_CALL_BANNER_DATA:
            return {
                ...state,
                callBannerData: payload
            }
        default:
            return state
    }
}

export default call;
