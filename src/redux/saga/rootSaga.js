import {all} from 'redux-saga/effects';
import settingSaga from './settingSaga';
import authSaga from './authSaga';
import astrologerSaga from './astrologerSaga';
import callSaga from './callSaga';
import paymentSaga from './paymentSaga';
import chatSaga from './chatSaga';

export default function* rootSaga() {
  yield all([
    settingSaga(),
    authSaga(),
    astrologerSaga(),
    callSaga(),
    paymentSaga(),
    chatSaga()
  ]);
}
