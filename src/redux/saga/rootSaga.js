import { all } from 'redux-saga/effects';
import settingSaga from './settingSaga';
import authSaga from './authSaga';
import astrologerSaga from './astrologerSaga';
import callSaga from './callSaga';
import eCommerceSaga from './eCommerceSaga';
import coursesSaga from './courseSaga';
import paymentSaga from './paymentSaga';
import chatSaga from './chatSaga';
import liveSaga from './liveSaga';
import historySaga from './historySaga';

export default function* rootSaga() {
  yield all([
    settingSaga(),
    authSaga(), 
    astrologerSaga(),
    paymentSaga(),
    chatSaga(),
    callSaga(), 
    eCommerceSaga(), 
    coursesSaga(),
    liveSaga(),
    historySaga()
  ]);
}
