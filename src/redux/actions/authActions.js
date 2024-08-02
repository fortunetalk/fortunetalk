import * as actionTypes from '../actionTypes.js'

export const onLogin = payload => ({
    type: actionTypes.ON_LOGIN,
    payload
})

export const onGoogleLogin = payload => ({
    type: actionTypes.ON_GOOGLE_LOGIN,
    payload
})

export const onFacebookLogin = payload => ({
    type: actionTypes.ON_FACEBOOK_LOGIN,
    payload
})

export const onOtpVerification = payload => ({
    type: actionTypes.ON_OTP_VERIFICATION,
    payload
})

export const onCustomerRegistration = payload => ({
    type: actionTypes.ON_CUSTOMER_REGISTRATION,
    payload
})

export const onCustomerblogs = payload => ({
    type: actionTypes.SET_BLOGS,
    payload
})

export const onCustomerTestimonials = payload => ({
    type: actionTypes.SET_TESTIMONIALS,
    payload
})

