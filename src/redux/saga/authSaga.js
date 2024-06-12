import { call, put, takeLeading } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, Profile } from 'react-native-fbsdk-next';
import { navigate, replace, resetToScreen } from '../../utils/navigationServices';
import { blobRequest, postRequest } from '../../utils/apiRequests';
import { app_api_url, customer_facebook_login, customer_google_login, customer_login, customer_otp_verify, customer_registration } from '../../config/constants';
import { getFcmToken, showToastMessage } from '../../utils/services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onUserLogin } from '../../utils/zegoCall';

function* onLogin(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const { payload } = actions
        const response = yield postRequest({
            url: app_api_url + customer_login,
            data: {
                phoneNumber: payload?.phoneNumber
            }
        })
        if (response?.success) {
            yield call(navigate, 'otp', { otp: response?.data, ...payload })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* onGoogleLogin(actions) {
    try {
        yield GoogleSignin.hasPlayServices();
        const userInfo = yield GoogleSignin.signIn();
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const response = yield postRequest({
            url: app_api_url + customer_google_login,
            data: {
                email: userInfo.user.email,
                firstName: userInfo.user.givenName,
                lastName: userInfo.user.familyName,
                fcmToken: yield getFcmToken() ?? 'not_fount'
            }
        })

        if (response?.success) {
            yield AsyncStorage.setItem('customerData', JSON.stringify(response?.data))
            yield put({ type: actionTypes.SET_CUSTOMER_DATA, payload: response?.data })
            yield call(resetToScreen, 'home')
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* onFacebookLogin(actions) {
    try {
        const result = yield LoginManager.logInWithPermissions(['public_profile']);
        if (result.isCancelled) {
            console.log('Login cancelled');
        } else {
            console.log(
                'Login success with permissions: ' +
                result.grantedPermissions.toString()
            );
            const currentProfile = yield Profile.getCurrentProfile();
            if (currentProfile) {
                yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
                const response = yield postRequest({
                    url: app_api_url + customer_facebook_login,
                    data: {
                        facebookId: currentProfile?.userID,
                        firstName: currentProfile?.firstName,
                        lastName: currentProfile?.lastName,
                        fcmToken: yield getFcmToken() ?? 'not_fount'
                    }
                })
                if (response?.success) {
                    yield AsyncStorage.setItem('customerData', JSON.stringify(response?.data))
                    yield put({ type: actionTypes.SET_CUSTOMER_DATA, payload: response?.data })
                    yield call(resetToScreen, 'home')
                }
            }
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* onOtpVerification(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const { otpData, dispatch } = actions.payload
        const response = yield postRequest({
            url: app_api_url + customer_otp_verify,
            data: {
                phoneNumber: otpData?.phoneNumber,
                countryCode: otpData?.callingCode,
                fcmToken: yield getFcmToken() ?? 'not_found'
            }
        })
        if (response?.success) {
            yield AsyncStorage.setItem('customerData', JSON.stringify(response?.data?.customer))
            yield put({ type: actionTypes.SET_CUSTOMER_DATA, payload: response?.data?.customer })
            yield onUserLogin("1", 'Ranjeet Kumar')
            if (response?.data?.type == 'home') {
                yield call(resetToScreen, response?.data?.type)
            } else {
                yield call(replace, response?.data?.type)
            }

        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* onCustomerRegistration(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const { payload } = actions
        const response = yield blobRequest({
            url: app_api_url + customer_registration,
            data: payload
        })
        if (response?.success) {
            yield AsyncStorage.setItem('customerData', JSON.stringify(response?.data))
            yield put({ type: actionTypes.SET_CUSTOMER_DATA, payload: response?.data })
            yield call(showToastMessage, { message: response?.message })
            yield call(resetToScreen, 'home')
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
    }
}

export default function* authSaga() {
    yield takeLeading(actionTypes.ON_LOGIN, onLogin);
    yield takeLeading(actionTypes.ON_FACEBOOK_LOGIN, onFacebookLogin);
    yield takeLeading(actionTypes.ON_GOOGLE_LOGIN, onGoogleLogin);
    yield takeLeading(actionTypes.ON_OTP_VERIFICATION, onOtpVerification);
    yield takeLeading(actionTypes.ON_CUSTOMER_REGISTRATION, onCustomerRegistration);
}