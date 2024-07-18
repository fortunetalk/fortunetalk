import * as actionTypes from "../actionTypes"

export const sendCallRequest = payload => ({
    type: actionTypes.SEND_CALL_REQUEST,
    payload
})

export const getCallInovoiceData = payload => ({
    type: actionTypes.GET_CALL_INVOICE_DATA,
    payload
})

export const setCallInvoiceData = payload => ({
    type: actionTypes.SET_CALL_INVOICE_DATA,
    payload
})