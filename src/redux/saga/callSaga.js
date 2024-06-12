import { call, takeLeading } from "redux-saga/effects"
import * as actionTypes from "../actionTypes"
import { sendCallInvitation } from "../../utils/zegoCall"

function* sendCallRequest(actions) {
    try {
        const { navigation } = actions.payload
        const callTo = [{ userID: "2", userName: 'John', }]
        yield call(sendCallInvitation, { navigation, callTo })
    } catch (e) {
        console.log(e)
    }
}

export default function* callSaga() {
    yield takeLeading(actionTypes.SEND_CALL_REQUEST, sendCallRequest)
}