import * as actionTypes from "../actionTypes"

export const sendCallRequest = payload => ({
    type: actionTypes.SEND_CALL_REQUEST,
    payload
})