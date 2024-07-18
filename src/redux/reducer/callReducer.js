import * as  actionTypes from '../actionTypes'

const initialState = {
    callInvoiceData: {
        visible: false,
        data: null
    }
}

const call = (state = initialState, actions) =>{
    const { type, payload } = actions
    switch(type){
        case actionTypes.SET_CALL_INVOICE_DATA:
            return{
               ...state,
               callInvoiceData: payload
            }
        default:
            return state
    }
}

export default call;
