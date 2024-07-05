import { put, takeLeading } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes'
import { getRequest } from '../../utils/apiRequests'
import {
    app_api_url,
    get_course_banner,
    get_course_list
} from '../../config/constants'

function* getCourseBanner() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const response = yield getRequest({
            url: app_api_url + get_course_banner,
        })

        if (response?.success) {
            yield put({ type: actionTypes.GET_COURSE_BANNER, payload: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

function* getCourseList() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const response = yield getRequest({
            url: app_api_url + get_course_list,
        })

        if (response?.success) {
            yield put({ type: actionTypes.GET_COURSES_LIST, payload: response?.data })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
        console.log(e)
    }
}

export default function* coursesSaga() {
    yield takeLeading(actionTypes.GET_COURSE_BANNER, getCourseBanner)
    yield takeLeading(actionTypes.GET_COURSES_LIST, getCourseList )
}