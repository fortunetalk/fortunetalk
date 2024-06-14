import { all } from 'redux-saga/effects';
import settingSaga from './settingSaga';
import authSaga from './authSaga';
import astrologerSaga from './astrologerSaga';
import callSaga from './callSaga';
import eCommerceSaga from './eCommerceSaga';

export default function* rootSaga() {
  yield all([settingSaga(), authSaga(), astrologerSaga(), callSaga(), eCommerceSaga()]);
}
